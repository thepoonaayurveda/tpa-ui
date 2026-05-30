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
- [ ] 🟢 Add `Article`/`BlogPosting` + `BreadcrumbList` JSON-LD to blog posts (build once, reuse).

### Content — joint-pain cluster → Flexio Oil (KD≈0, commercial; write in this order)
_Full briefs (titles + supporting keywords + volumes) in strategy doc §3b._

- [ ] 🟢 **Per-article SERP teardown** (do as step 1 of each brief, NOT upfront): open the top 3 ranking URLs for the article's primary keyword and note depth, structure, FAQ/schema use, ingredient framing, and claim language. Free, no Ahrefs credits. Skip the heavy stuff — no full competitor domain/backlink analysis until we actually rank (revisit at P3).

- [ ] 🔴 **C1** — "Best Ayurvedic Oil for Joint Pain in India" (`best ayurvedic oil for joint pain` 150 + `best joint pain relief oil in india` 200). Commercial converter. → Flexio.
- [ ] 🔴 **C2** — "Best Ayurvedic Oil for Knee Joint Pain" (`best ayurvedic oil for knee joint pain` 300). Highest-volume commercial term. → Flexio.
- [ ] 🔴 **C3** — "Nirgundi Oil: Benefits for Joint Pain" (`nirgundi oil for joint pain` 200; exact-match to Flexio's hero ingredient). → Flexio.
- [ ] 🟡 **C4** — "How to Use Massage Oil for Joint Pain" (`joint pain massage oil` 40 + how-to long tail ~580/mo combined). → Flexio.
- [ ] 🟡 **C5** — "Ayurvedic Oil for Joint & Muscle Pain" (`ayurvedic oil for joint and muscle pain` 80 + ~290/mo cluster). → Flexio.
- [ ] 🟡 **C6** — "Natural Oils for Joint Pain: What Works" (comparison; `castor oil for joint pain` 100 + mustard/sesame/eucalyptus ~560/mo). Positions Flexio as the formulated option. → Flexio.
- [ ] 🟢 **C7** — "How to Make Joint Pain Oil at Home" (`homemade massage oil for joint pain` 30; honest DIY → soft sell). → Flexio.
- [ ] 🟡 Wire real reviews into `AggregateRating` schema on product pages (reviews API exists — **never fake ratings**).

## P2 — Depth + allergy + sitewide polish

_(Joint-oil long-tail articles C4–C7 above can also slip here if P1 fills up.)_
- [ ] 🟡 Improve image `alt` text to be descriptive (e.g. "Ayurvedic joint pain oil 100ml bottle"), not just `product.name`.
- [ ] 🟡 Add `CollectionPage` + `BreadcrumbList` JSON-LD to `/products`.
- [ ] 🟢 Add `LocalBusiness`/`Organization` JSON-LD to `/contact` (Daund-Pune address, `tel:+919730005222`, email, hours).
- [ ] 🟢 Add `AboutPage` JSON-LD to `/about`.
- [ ] 🟡 Surface trust signals on-page: FSSAI/AYUSH license numbers, India shipping/COD, Made-in-India.
### Content — allergy cluster → AllerGenie (informational, higher KD, ⚠️ compliance-sensitive)
_Frame all as *manage/relieve/support*, NEVER *cure*. Briefs in strategy doc §3b._

- [ ] 🟡 **C8** — "Ayurvedic Approach to Dust Allergy" (`how to cure dust allergy` 200 + permanently 700; KD 37).
- [ ] 🟡 **C9** — "Ayurvedic & Natural Remedies for Skin Allergy" (`how to cure skin allergy naturally` 250; KD 23).
- [ ] 🟡 **C10** — "Managing Seasonal Sneezing & Cold Allergy" (`how to cure sneezing allergy` 30 + cold 150; KD 12–30).
- [ ] 🟢 **C11** — "Can Allergies Be Cured? An Honest Ayurvedic View" (`can homeopathy cure allergy permanently` 90; KD 0; trust piece).
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
