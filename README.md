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
