# DNS migration runbook

Captured 30 July 2026. Two separate jobs, deliberately kept apart:

| | What | Risk | Reversible in |
|---|---|---|---|
| **Phase 1** | Point contrafaba.com at Netlify (records change, nameservers stay at SiteGround) | Low | ~5 minutes |
| **Phase 2** | Move DNS authority from SiteGround to Infomaniak (nameservers change) | Low, but slow | ~48 hours |

**Do them separately, and in this order.** Doing both at once means a failure could
be either the hosting change or the nameserver change, during a 48-hour window
where you cannot cleanly roll back.

## Why the order matters

The A record TTL is now **300s**, so record changes inside SiteGround's zone
propagate in about 5 minutes. That makes Phase 1 fast and genuinely reversible.

A **nameserver** change is different. The `.com` registry publishes the
nameserver records with a TTL of **172800s — 48 hours**. Lowering the A record TTL
does nothing for this. For up to two days after switching, some resolvers will
still ask SiteGround and others will ask Infomaniak.

The trick that makes Phase 2 invisible: **leave SiteGround's zone in place and
correct.** If both nameserver sets return identical answers, it does not matter
which one a resolver uses. Only cancel SiteGround once the switch has fully
propagated.

---

## Phase 1 — go live on Netlify

### 1. Add the domain in Netlify first

Netlify → Domain management → Add a domain → `contrafaba.com` (and `www.contrafaba.com`).

It will report "awaiting external DNS" and cannot issue a certificate yet. That is
expected. Adding it first means the certificate provisions the moment DNS resolves,
rather than after another round trip.

### 2. Change two records in SiteGround DNS

| Type | Name | Current value | New value |
|---|---|---|---|
| A | `@` | 35.214.69.78 | **75.2.60.5** |
| A → CNAME | `www` | 35.214.69.78 | **contrafaba.netlify.app** |

`75.2.60.5` is Netlify's load balancer, verified serving this site correctly
(reverse DNS: `awsglobalaccelerator.com`; an HTTPS request to that IP with
`Host: contrafaba.netlify.app` returns 200).

**Do not use a CNAME at the apex.** A CNAME at the apex forbids every other
record at that name — including `MX`. That would take email down. The apex must be
an `A` record, or an `ALIAS`/`ANAME`/flattened CNAME if the provider offers one.

### 3. Do NOT touch these

```
MX      @                   1 smtp.google.com.
TXT     @                   v=spf1 include:_spf.google.com ~all
TXT     @                   google-site-verification=MfpKiSnC-...
TXT     _dmarc              v=DMARC1; p=none; aspf=r; adkim=r;
TXT     google._domainkey   v=DKIM1; k=rsa; p=MIIBIjANBg...  (see Phase 2)
```

These are Google Workspace. Changing any of them affects email, not the website.

### 4. Verify (about 5 minutes later)

```bash
dig +short contrafaba.com A          # expect 75.2.60.5
dig +short www.contrafaba.com        # expect contrafaba.netlify.app -> Netlify IPs
dig +short MX contrafaba.com         # expect 1 smtp.google.com.  (unchanged)

# every legacy URL must return 200 with NO redirect
for p in "" about/ services/ our-work/ contact/; do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "https://contrafaba.com/$p"
done
```

Then send one test email to a Contra Faba address and reply from it, to confirm
inbound and outbound both still work.

**Rollback:** set the apex A back to `35.214.69.78` and www back to an A record
with the same value. Live again within ~5 minutes.

### 5. Search Console

Submit `https://contrafaba.com/sitemap-index.xml`. Leave the
`google-site-verification` TXT record alone or verification breaks.

Also add the Search Console service account to the contrafaba.com property if you
want rankings monitored through the switch — it currently only has access to
mutomorro.com.

---

## Phase 2 — move DNS to Infomaniak

Only start once Phase 1 is verified and stable for a few days.

The domain is **already registered at Infomaniak** (registrar: Infomaniak Network
SA). Only DNS authority sits at SiteGround (`ns1/ns2.siteground.net`). So this is
a nameserver change plus recreating the zone — not a domain transfer.

### 1. Pre-stage the entire zone at Infomaniak BEFORE switching nameservers

Create every record below in Infomaniak's DNS editor while the domain is still
being served by SiteGround. Nothing goes live until the nameservers change, so
this is safe to do at leisure and to double-check.

**Website**

| Type | Name | Value |
|---|---|---|
| A | `@` | `75.2.60.5` |
| CNAME | `www` | `contrafaba.netlify.app` |

**Email — Google Workspace. Every one of these matters.**

| Type | Name | Value |
|---|---|---|
| MX | `@` | `smtp.google.com.` priority `1` |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `@` | `google-site-verification=MfpKiSnC-BCChPJDCUkKGk3ZwYR_fvb558EgxCDqYJ0` |
| TXT | `_dmarc` | `v=DMARC1; p=none; aspf=r; adkim=r;` |
| TXT | `google._domainkey` | the DKIM value below, as **one** record |

DKIM value (410 characters, verified as a valid 2048-bit RSA key):

```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA22MOiynjLhbjxFTt3YDDovQ97G5mEyKbwbgWoR7W9bIFqMeWdVeMRs2O2Y7TCOcW5sSeFV9nvY/UDUnu6XKjWj97e5D1tNcR/I8eStWuk5VUD1/QDgJV6CMoa4b+eHhkdUKsVE3LU+d3Fui5C4bxfioZpxV6EnFnFj2TAnoS29VazKu6SH6WXHxQ55NNmGDaiQaRV9BymhbFt0vQA77p4J3gDAL/r244+XZpWOZTNhrJjJOqU149bhLF/yxcHkXqim2BnOKSUj56rpNAsXUBfgIDRSf2x8Kdtkc3ooXSUrXHEHAceO7ntqkQv97j2mj8Wxyn4viMZT7ltreQtns3yQIDAQAB
```

**This is the single most dangerous record in the migration.** `dig` displays it
as two quoted strings because a DNS TXT string is capped at 255 characters — it is
still **one logical record**, split 255 + 155. Entering it as two separate TXT
records breaks DKIM signing. Paste the whole value into one field and let
Infomaniak handle the chunking.

DKIM failing does not bounce mail. It quietly increases the chance of Contra Faba's
email being filtered as spam, which is far harder to notice than an outage.

### 2. Records to DROP, not migrate

| Type | Name | Value |
|---|---|---|
| A | `mail` | 35.214.69.78 |
| A | `ftp` | 35.214.69.78 |
| A | `autodiscover` | 35.214.69.78 |
| A | `autoconfig` | 35.214.69.78 |

All four point at the SiteGround server and are cPanel defaults. Once SiteGround is
gone they resolve to a dead or reassigned host.

`autodiscover` and `autoconfig` are worth actively removing rather than merely
ignoring: mail clients query them to self-configure, so pointing them at a dead
server makes account setup fail in a confusing way. Google Workspace does not use
them.

### 3. Switch the nameservers

In Infomaniak's domain settings, change from SiteGround's nameservers to
Infomaniak's own.

**Leave the SiteGround zone exactly as it is.** During the 48-hour propagation
both nameserver sets must give the same answers. This is what makes the switch
invisible.

### 4. Verify over several days

```bash
# which nameservers does the registry advertise now?
dig +noall +authority @a.gtld-servers.net contrafaba.com NS

# ask each side directly — the answers must match
for ns in ns1.siteground.net <infomaniak-ns>; do
  echo "== $ns"
  dig +short @$ns contrafaba.com A
  dig +short @$ns MX contrafaba.com
  dig +short @$ns google._domainkey.contrafaba.com TXT
done
```

Check DKIM/SPF/DMARC end to end by sending a message to a Gmail address and
reading *Show original* — it should report `PASS` for all three.

### 5. Only then cancel SiteGround

Once the registry shows only Infomaniak nameservers and both sides have agreed for
a week. Before cancelling, check the SiteGround account for anything not visible
in DNS: email forwarders or aliases, databases, cron jobs, other domains, backups
worth keeping.

---

## Full pre-migration DNS backup

Captured from `ns1.siteground.net`, 30 July 2026. A zone transfer (AXFR) was
refused, so this was built from targeted queries and **cannot be proven complete**
— export the zone file from SiteGround to be certain nothing is missing.

```
SOA    @                   ns1.siteground.net. admins.siteground.com. 100 10800 3600 1209600 3600
NS     @                   ns1.siteground.net.
NS     @                   ns2.siteground.net.
A      @                   35.214.69.78
A      www                 35.214.69.78
A      mail                35.214.69.78
A      ftp                 35.214.69.78
A      autodiscover        35.214.69.78
A      autoconfig          35.214.69.78
MX     @                   1 smtp.google.com.
TXT    @                   "v=spf1 include:_spf.google.com ~all"
TXT    @                   "google-site-verification=MfpKiSnC-BCChPJDCUkKGk3ZwYR_fvb558EgxCDqYJ0"
TXT    _dmarc              "v=DMARC1; p=none; aspf=r; adkim=r;"
TXT    google._domainkey   "v=DKIM1; k=rsa; p=MIIBIjANBg..." (410 chars, see above)
```

No `AAAA`, `CAA` or `SRV` records were found.

Worth adding while you are in there: a `CAA` record authorising Let's Encrypt, so
no other CA can issue certificates for the domain.

```
CAA    @    0 issue "letsencrypt.org"
```
