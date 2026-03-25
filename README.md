# Contra Faba

Cost consultants for the construction industry. Built with Next.js, Sanity, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity v5
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel
- **Language:** TypeScript

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd contra-faba
npm install
```

### 2. Set up environment

The Sanity project is already created (project ID: `bbfankjm`). Create `.env.local`:

```bash
cp .env.local.example .env.local
```

The defaults are already correct - no changes needed.

### 3. Run locally

```bash
npm run dev
```

- **Site:** [http://localhost:3000](http://localhost:3000)
- **Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

### 4. Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add the environment variables from `.env.local`
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (header, footer)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx      # About page
│   ├── services/page.tsx   # Services page
│   ├── our-work/
│   │   ├── page.tsx        # Project listing (Sanity)
│   │   └── [slug]/page.tsx # Project detail (Sanity)
│   ├── contact/page.tsx    # Contact page
│   └── studio/             # Embedded Sanity Studio
├── components/             # Shared UI components
├── lib/
│   ├── sanity.ts           # Sanity client config
│   └── queries.ts          # GROQ queries
└── sanity/
    └── schemas/            # Sanity content schemas
```

## Content Management

Jamie can manage project case studies via the Sanity Studio at `/studio`. Each project has:

- Title and slug
- Client type (architect / contractor / homeowner)
- Summary and rich text description
- Featured image and optional gallery
- Published date and homepage feature toggle

## TODO

- [ ] Confirm brand hex colours with Jamie
- [ ] Add Jamie's headshot to About page
- [ ] Wire up contact form (Formspree / Resend / API route)
- [ ] Add Sanity project ID to env vars
- [ ] Configure CORS in Sanity for the live domain
- [ ] Set up Vercel domain pointing for contrafaba.com
- [ ] Add redirects from old WordPress URLs
- [ ] OG image generation
- [ ] Google Analytics / Plausible
