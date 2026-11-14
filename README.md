# modu. — Shopify Sections Marketplace

A minimal, search-first storefront for selling standalone Shopify Liquid sections.

## Preview and development

This is a **frontend prototype**, not a fully operational e-commerce business. Sample product listings are concept demonstrations; checkout, accounts, real downloadable Liquid sections and licensing infrastructure are not yet implemented.

The design uses Plus Jakarta Sans, a centered text-only hero search, category/industry/style filters, responsive catalog cards and section preview interactions.

## Development

Open `index.html` in a browser, or serve this folder with `python3 -m http.server 8000`.

Source files:
- `index.html` — layout and semantic markup
- `styles.css` — base design system
- `refined.css` — latest refined layout
- `app.js` — section catalog and interaction logic
- `.github/workflows/deploy.yml` — GitHub Pages deployment on each push to `main`

## Hosting

Repository: https://github.com/teamhamad/modu-sections

To enable hosting, open **Settings → Pages → Build and deployment → Source: GitHub Actions**. Once enabled, pushes to `main` trigger the deployment workflow. Expected URL: https://teamhamad.github.io/modu-sections/ (verify deployment before sharing as live).

## Design constraints

Keep the hero centered, spacious and **completely free of images or illustrations**. Preserve Plus Jakarta Sans and the calm editorial visual design. Product cards may include visual previews. Search and all filters must remain functional.

## Next steps

1. Import real Shopify Liquid sections with working install instructions.
2. Replace sample cards with authenticated section catalog entries.
3. Build dedicated product-detail and live demo pages.
4. Add customer access, secure delivery, checkout, licensing and support.
