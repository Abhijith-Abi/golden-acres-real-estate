# SEO and favicon audit: goldenacresrealestate.co.in

## Changed files
- `src/app/layout.tsx`
  - Icon declarations reduced to `/favicon.ico` (48x48), `/favicon-48x48.png`, `/favicon-96x96.png`, `/icon-192.png`, plus the apple-touch icon. The 140 KB `favicon.svg` (a raster embedded in SVG) and the 32px PNG are no longer declared.
  - Removed the root-layout `alternates.canonical` and hreflang. They were inherited by any page that didn't set its own and pointed it at the homepage. All 12 page types already set their own through `buildMetadata()`.
- `.agents/tasks/seo-favicon/report.md` (this file)

## Root causes
1. **Canonical host conflict (main cause, deployment config, not code).** Live checks on 22 Nov 2026:
   - `https://www.goldenacresrealestate.co.in/*` returns 308 to `https://goldenacresrealestate.co.in/*` (Vercel domain setting).
   - The code's canonical, Open Graph URLs, sitemap, robots `Sitemap:` line and JSON-LD all use `https://www.…`.
   - Google therefore sees www pages that redirect to the apex while the apex page declares www as canonical. This is contradictory.
   - Google's favicon fetch is tied to the host and homepage it indexed (www per your screenshot), so it hits the redirect and conflicting signals. This is the most likely reason for the globe.
2. **Icon assets and declarations are valid.** All were verified locally and live:
   - `favicon.ico` contains 16, 32 and 48px images.
   - PNGs at 48, 96 and 192px, and the 180px apple icon, are square.
   - Every icon returns 200 with the correct content type.
   - `robots.txt` allows `/` and does not block the icons.
   - The markup was cluttered, with 7 `rel=icon` links including a large SVG, which can make Google's choice ambiguous. This is now simplified.
3. Google caches favicons separately from pages and updates them slowly, usually days to weeks. This can't be forced from code.

## Already correct (no change needed)
Unique titles and descriptions per page; per-page canonical, Open Graph and Twitter blocks; `robots.ts` and `sitemap.ts` (home, properties, 4 landing pages, 9 locations, services, about, projects, FAQ, contact); JSON-LD (RealEstateAgent, WebSite, breadcrumbs, FAQ, WebPage); `llms.txt`; manifest; image `alt` text (the hero background `alt=""` is intentionally decorative); sample listings set to noindex and left out of the sitemap. All 8 current property listings are marked `sample`, so no property detail pages are in the sitemap yet.

## Verification (local, production build)
- `npm run lint`: 0 errors, 5 existing unused-import warnings (not touched).
- `npx tsc --noEmit`: passes.
- `npm run build`: passes, 36 static pages.
- `next start`, then curl on `/`, `/about`, `/properties`, `/contact`, `/locations/kazhakootam`, `/trivandrum/land-for-sale` and `/properties/sample-plot-vellayani`:
  - Each has a unique title and a self-referencing www canonical. The sample property has `noindex, follow` and the rest have `index, follow`.
  - The new icon link set is present on every page.
- `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/favicon-48x48.png`, `/icon-192.png`, `/apple-touch-icon.png` and `/manifest.webmanifest` all return 200. The sitemap and robots `Sitemap:` line use www.

## Remaining actions (need your access)
1. **Vercel → Project → Domains: make `www.goldenacresrealestate.co.in` the primary domain and redirect the apex to www.** This is the reverse of today. After that, check that `curl -I https://goldenacresrealestate.co.in/` returns 308 to www and that `https://www…/` returns 200. I did not add a code redirect, because it would loop with the current Vercel setting.
   - If you would rather use the apex as primary, set `NEXT_PUBLIC_SITE_URL=https://goldenacresrealestate.co.in` in Vercel and rebuild. Everything follows from that variable.
2. Deploy this commit.
3. In Search Console, add a Domain property, run URL Inspection → Request indexing on `/`, and resubmit `sitemap.xml`.
4. Wait for Google to recrawl. The favicon can take days to weeks to appear. Not guaranteed.
5. Optional: in Search Console, check the Page indexing report for "Page with redirect" or "Alternate page with proper canonical tag" on the apex.

## Not verifiable locally
- Google's favicon pick-up and timing.
- Production behaviour after the domain change. Live headers were observed from the pre-fix deployment.
- Search Console data. Whether the apex or www is the version Google currently has indexed is inferred from your screenshot.
