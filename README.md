# modu. Shopify Sections Marketplace

An independent storefront for **original Shopify Liquid sections** — not complete themes. Clean Plus Jakarta Sans design, centered text-only search hero, curated categories and faceted discovery.

## Current state

The site intentionally displays an empty catalog until real Liquid sections are completed. No demo listings, fake reviews or invented prices are published. Search, filters and saved-section capabilities remain wired to an extensible catalog.

Source of truth for public listings: `data/sections.json` (currently `[]`). See [CATALOG_GUIDE.md](CATALOG_GUIDE.md) for the exact release checklist and JSON record schema.

## Run locally

Host with a local HTTP server so the browser can fetch the catalog:

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000. Directly opening `index.html` from disk is not sufficient because browsers block `fetch()` for local file URLs.

## Deployment

Pushing to the `main` branch triggers GitHub Pages deployment using `.github/workflows/deploy.yml`.

Repo: https://github.com/teamhamad/modu-sections
Public website: https://teamhamad.github.io/modu-sections/

## Design rules

- Keep the hero text-only (no image or illustration) with its centered search field.
- Keep Plus Jakarta Sans and restrained, airy visual styling.
- Separate section-type and merchant-industry filters.
- Show only real screenshots/previews from completed Liquid sections.
- Never commit secret keys, paid downloadable Liquid bundles, or private Figma assets without permission.

## AURELLE storefront & secure downloads

AURELLE product detail pages live at section.html?section=PRODUCT_ID. Liquid ZIP packages are kept private. Once Shopify Digital Products is configured and live products are verified, set price/checkoutUrl/published/shopifyTested in data/collections/aurelle.json. See SELLING_SETUP.md. Editable Figma design source links are not public.

## Live AURELLE catalog (November 2026)

The homepage now lists 10 AURELLE Liquid builds as **in-development section previews** (no invented prices or purchasable buttons). Design preview screenshots are supplied by the user's AURELLE file and explicitly labeled as design previews, not proof of live Shopify rendering. Each card opens a section detail page, and search/type/industry filters work against `data/sections.json`.

When a section passes Shopify testing, replace its design screenshot with an actual Shopify screenshot, attach its protected ZIP to a commercial Shopify Digital Product, and enable its purchase link/price. Do not copy paid ZIP contents into this public repository.

## Full-screen preview

All AURELLE sections now link to `preview.html?section=SECTION_ID`, a viewport-filling viewer with fit and 100% zoom, a browser fullscreen toggle, and desktop/mobile status. The brand is the simple typography-only `modu.` wordmark. Design references are not live tested Shopify demos.

## Offline development milestone — version 1.1

The owner requested that development proceed from AURELLE Figma designs without using their connected Shopify store. Ten private standalone Liquid sections have been polished and structurally checked offline. See [AURELLE_INVENTORY.md](AURELLE_INVENTORY.md). Paid source remains outside public GitHub and the catalog remains explicitly pre-release until a store-render test and secure payment/delivery setup are completed.
