# The Poona Ayurveda — SEO Tasks (priority-ordered)

Pure task list. Rationale and data live in `seo-strategy.md`. Work top to bottom.
Legend: 🟢 quick win · 🟡 medium · 🔴 larger effort · `[ ]` todo · `[x]` done

---

## P0 — Foundation (do first, unblocks everything)

- [ ] 🟡 Build a reusable `<JsonLd>` component (renders `<script type="application/ld+json">`).
- [ ] 🟢 Add `Organization` + `WebSite` (with `SearchAction`) JSON-LD to homepage `/`.
- [ ] 🟢 Add a `metadata` export to homepage `src/app/page.tsx` (currently inherits generic root). Keyword-led title + description + OG.
- [ ] 🟢 Change `<html lang="en">` → `lang="en-IN"` in `src/app/layout.tsx`.
- [ ] 🟢 Add `alternates.canonical` to product `generateMetadata` (and other pages) to kill `?category=` duplicates.
- [ ] 🟡 Connect/verify **Google Search Console** + submit `sitemap.xml`. (Needed to measure everything below.)

## P1 — Joint-oil commercial win (Flexio Oil — highest ROI)

- [ ] 🔴 Add `Product` + `Offer` JSON-LD to `/products/[slug]` (name, image, brand, **INR** price, availability).
- [ ] 🟡 Add `FAQPage` JSON-LD to product pages (we already render `ProductFAQs` — just emit schema).
- [ ] 🟡 Add `BreadcrumbList` JSON-LD (the `Breadcrumb` component renders visually but emits no schema).
- [ ] 🟡 Make product titles keyword-led in `generateMetadata`: inject search intent, e.g. `"Flexio Oil – Ayurvedic Joint Pain Oil with Nirgundi | The Poona Ayurveda"` (not raw product name).
- [ ] 🟡 Add a templated meta-description fallback per product (current fallback is blank when WooCommerce `short_description` is empty).
- [ ] 🟢 Ensure product page H1 contains the primary keyword (not just brand name); verify one H1 per page.
- [ ] 🔴 Build `/blog` route + content setup (MDX or WooCommerce posts) — blocker for all content tasks.
- [ ] 🔴 Write blog post: **"Best Ayurvedic Oil for Joint Pain in India"** (targets `ayurvedic oil for joint pain` 400/mo KD0, `best ayurvedic oil for joint pain` 150/mo). Link to Flexio.
- [ ] 🔴 Write blog post: **"Nirgundi Oil Benefits for Joint Pain"** (exact-match `nirgundi oil for joint pain` 200/mo KD0; ingredient authority). Link to Flexio.
- [ ] 🟢 Add `Article`/`BlogPosting` + `BreadcrumbList` JSON-LD to blog posts.
- [ ] 🟡 Wire real reviews into `AggregateRating` schema on product pages (reviews API exists — **never fake ratings**).

## P2 — Depth + allergy + sitewide polish

- [ ] 🟡 Write body-part blog pages: "Oil for Knee Joint Pain" (`oil for knee joint pain` 70/mo), "Joint Pain Massage Oil — How to Use".
- [ ] 🟡 Improve image `alt` text to be descriptive (e.g. "Ayurvedic joint pain oil 100ml bottle"), not just `product.name`.
- [ ] 🟡 Add `CollectionPage` + `BreadcrumbList` JSON-LD to `/products`.
- [ ] 🟢 Add `LocalBusiness`/`Organization` JSON-LD to `/contact` (Daund-Pune address, `tel:+919730005222`, email, hours).
- [ ] 🟢 Add `AboutPage` JSON-LD to `/about`.
- [ ] 🟡 Surface trust signals on-page: FSSAI/AYUSH license numbers, India shipping/COD, Made-in-India.
- [ ] 🟡 Allergy pillar post: **"Ayurvedic Approach to Allergies"** + home-remedy posts. ⚠️ Frame as *support/relief*, NEVER *cure* (compliance).
- [ ] 🟢 Build internal-linking graph: blog → product, product → product (use `productRelationships.ts`), descriptive anchors.

## P3 — Expand to other products (gated on research below)

- [ ] 🔴 After Uristo/Vario/etc. research lands, repeat the P1 pattern (product schema + keyword-led title + 1–2 blog posts) per validated cluster.

---

## Research tasks (Ahrefs — credit-conscious, ONE seed at a time)

Do these **in order**. After each export, I read the cluster holistically (intent,
winnability, product fit, demand shape, compliance — see strategy doc §7, no rigid
thresholds) and recommend go-deeper / defer / skip with reasoning. Don't bulk-research.

- [ ] 1. Export India "Matching terms" + "Questions" for **`urine infection ayurvedic medicine`** (Uristo). → send CSV, await go/no-go.
- [ ] 2. Then **`varicose veins treatment`** (Vario) — only after #1 is judged.
- [ ] 3. Then **`ayurvedic medicine for diabetes`** (Glycemio) — expect high KD; research to size it.
- [ ] 4. Then **`shilajit benefits`** (Endurio) — crowded; check for long-tail entry.
- [ ] 5. Then **`ayurvedic massage oil`** (Sports Edge) — last; may overlap Flexio content.

- [ ] (optional, not credit-gated) Export **Ahrefs Site Audit** of `thepoonaayurveda.com`.
- [ ] (optional) Export **Search Console** performance data once GSC is connected.

---

## Measurement (ongoing)

- [ ] 🟢 Validate every JSON-LD type in Google **Rich Results Test** before shipping.
- [ ] 🟢 Track rankings for the Tier-1 joint-oil keywords monthly in Ahrefs.
- [ ] 🟢 Watch GSC for impressions/CTR on product pages after title + schema changes.
