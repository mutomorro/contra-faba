#!/usr/bin/env bash
# Downsize the WordPress originals into build-optimised sources for Astro.
#
# The originals are full-resolution camera files (up to 7952x5304 / 42MP, 32MB
# each) totalling ~292MB. Astro generates responsive WebP/AVIF at build time, so
# the committed sources only need to be large enough for the biggest rendered
# size. 2400px on the longest edge is comfortably above any layout width here.
#
# Runs strictly sequentially: these are large files and parallel decoding is
# what makes this memory-hungry.
set -euo pipefail

SRC="public/images/wordpress"
MAXDIM=2400
QUALITY=82

mkdir -p src/assets/projects src/assets/services src/assets/site src/assets/logos

# resize <source> <dest-without-extension>  -> always emits .jpg
resize() {
  local src="$SRC/$1" dest="$2"
  if [[ ! -f "$src" ]]; then
    echo "  MISSING: $1" >&2
    return 1
  fi
  sips -s format jpeg -s formatOptions "$QUALITY" \
       --resampleHeightWidthMax "$MAXDIM" \
       "$src" --out "${dest}.jpg" >/dev/null
  printf "  %-46s -> %-52s %5sK\n" "$1" "${dest}.jpg" \
    "$(( $(stat -f%z "${dest}.jpg") / 1024 ))"
}

echo "== Project photos =="
resize "Crossbasket-Spa-and-Wellness.jpg" "src/assets/projects/crossbasket-spa-and-wellness"
resize "Battersea-copy.png"               "src/assets/projects/battersea-renovation"
resize "Wandsworth.jpeg"                  "src/assets/projects/wandsworth-renovation"
resize "Tufnell.jpeg"                     "src/assets/projects/tufnell-park-renovation"
resize "Ravenscourt.jpeg"                 "src/assets/projects/ravenscourt-renovation"

# Limehouse Retreat gallery (order preserved from the Sanity export)
i=1
for f in Limehouse48of107.jpg Limehouse49of107.jpg Limehouse50of107.jpg \
         Limehouse66of107.jpg Limehouse84of107.jpg limehouse86of107.jpg \
         Limehouse100of107.jpg Limehouse105of107.jpg Limehouse107of107.jpg \
         Limehouse108of2.jpg; do
  resize "$f" "$(printf 'src/assets/projects/limehouse-retreat-%02d' "$i")"
  i=$((i + 1))
done

# Hammersmith Renovation gallery (order preserved from the Sanity export)
i=1
for f in DSC00219.jpg DSC00159.jpg DSC00082.jpg DSC00218.jpg DSC00059.jpg DSC00006.jpg; do
  resize "$f" "$(printf 'src/assets/projects/hammersmith-renovation-%02d' "$i")"
  i=$((i + 1))
done

echo "== Service illustrations =="
resize "Feasability-Estimates.png"    "src/assets/services/feasibility-estimates"
resize "Cost-Estimating.png"          "src/assets/services/cost-estimating"
resize "Budget-Planning.png"          "src/assets/services/budget-development"
resize "Cost-Control-Monitoring.png"  "src/assets/services/cost-control-monitoring"

echo "== Site imagery =="
resize "Jamie-Gould-Contra-Faba-Headshot.png" "src/assets/site/jamie-gould"
resize "Locations-Contra-Faba.png"            "src/assets/site/locations"
resize "DSCF4166-HDR.jpg"                     "src/assets/site/approach"
resize "DSCF3829.jpg"                         "src/assets/site/value-engineering"

echo "== Logos (already small, copied as-is) =="
for f in "$SRC"/arch-client-*.png \
         "$SRC"/Maro-Construction-Logo.png \
         "$SRC"/Eco-Construction-Scotland-Logo.png \
         "$SRC"/Sygnet-Style-logo.png \
         "$SRC"/Hawksmore-Construction-Logo.png \
         "$SRC"/Highline-homes-logo.png \
         "$SRC"/OakTree-Renovations-Logo.png \
         "$SRC"/CostX-logo.png \
         "$SRC"/BCIS-logo.png \
         "$SRC"/monday-logo.png; do
  base=$(basename "$f")
  # lowercase, strip redundant "-logo"/"-Logo" noise into a consistent slug
  slug=$(echo "$base" | tr '[:upper:]' '[:lower:]')
  cp "$f" "src/assets/logos/$slug"
done
echo "  copied $(ls -1 src/assets/logos | wc -l | tr -d ' ') logo files"

echo
echo "== Result =="
du -sh src/assets
du -sh src/assets/*
