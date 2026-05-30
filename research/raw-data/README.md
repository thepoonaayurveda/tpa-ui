# Raw Keyword Research Data — The Poona Ayurveda

This folder holds the **cleaned, machine-readable** keyword data extracted from the
original Ahrefs export (`Keywords - TPA.csv`, exported 2026, India market).

## Files

| File | What it is |
|------|-----------|
| `tpa-keywords-clean.json` | **Source of truth.** All 580 unique keywords as structured JSON, for programmatic use (sitemap gen, content briefs, etc.). |
| `keywords/joint-pain-oil_flexio.csv` | 🟢 254 kw — the joint-pain cluster (→ Flexio Oil). Our priority. |
| `keywords/allergy_allergenie.csv` | 🟡 250 kw — allergy cluster (→ AllerGenie). Phase-2 content play. |
| `keywords/ayurved-branded_ignore.csv` | 🔴 36 kw — competitor-branded, not targeted. |
| `keywords/ayurved-institutions_ignore.csv` | 🔴 28 kw — hospitals/colleges/"near me", not targeted. |
| `keywords/ayurved-hair-oil_ignore.csv` | 🔴 12 kw — no matching product, not targeted. |

Each per-theme CSV is sorted by India search volume (descending). The combined JSON keeps
all themes together for scripting. When you add new Ahrefs research, drop one CSV per product
into `keywords/` following the same `<theme>_<product-or-ignore>.csv` naming.

## Column meaning

- `keyword` — the search query
- `theme` — semantic cluster we assigned (see below)
- `intent` — Ahrefs intent codes: `I` Informational · `C` Commercial · `T` Transactional · `N` Navigational · `Branded` · `Local`
- `kd` — Keyword Difficulty (0–100). Blank = Ahrefs had no KD for this long-tail term.
- `volume_in` — monthly search volume in **India** (the only market we care about)
- `volume_global` — global monthly volume (context only)
- `cpc` — cost-per-click in USD (proxy for commercial value)
- `parent_topic` — the broader Ahrefs parent topic

## The 5 themes (and how they map to us)

| Theme | # kw | ~IN vol/mo | Our product | Strategic value |
|-------|-----:|-----------:|-------------|-----------------|
| `joint-pain-oil` | 254 | ~11,000 | **Flexio Oil** (Nirgundi-based) | 🟢 **PRIMARY** — KD=0 on commercial keywords, direct product match |
| `allergy` | 250 | ~5,200 | **AllerGenie** | 🟡 Content/blog play — KD higher, mostly informational |
| `ayurved-generic-branded` | 36 | ~1,930 | — | 🔴 Competitor-branded, low relevance, skip |
| `ayurved-institution` | 28 | ~1,650 | — | 🔴 Hospitals/colleges/"near me", irrelevant to D2C, skip |
| `ayurved-hair-oil` | 12 | ~160 | — | 🔴 We don't sell hair oil, skip |

## ⚠️ Important caveats

1. **The original CSV is messy.** Columns shift between sections; KD lives in col 5, volume
   in col 6 (not where the headers suggest). The parser in git history handles this. If you
   re-export from Ahrefs, re-run the extraction rather than trusting raw column positions.
2. **Coverage is partial.** This research only covers 2 of our ~10 product lines
   (joint pain, allergy). Uristo (UTI), Vario (varicose), Endurio (men's health),
   Glycemio (diabetes/metabolic), and Sports Edge have **no keyword data yet** — see the
   "Research backlog" section of the strategy doc.

_Source export date in CSV: rows first seen 31 Dec 2020, data refreshed 2026._
