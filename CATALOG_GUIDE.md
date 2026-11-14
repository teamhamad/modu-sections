# Publishing authentic Shopify sections

This is a **sections** marketplace, not a full-theme store. The public catalog is deliberately empty until the first finished, tested Liquid section is ready.

## Data source

The homepage reads `data/sections.json` dynamically. It currently contains **[]**. Nothing is pre-populated with fake product titles, ratings, prices, screenshots or reviews.

To add a real section, create a record in this file using this structure (shown here as a schema example, **not** as an actual listing):

```json
{
  "id": "your-real-section-slug",
  "name": "Your verified section name",
  "published": true,
  "type": "Product sections",
  "industry": ["Skincare & beauty"],
  "style": "Minimal",
  "desc": "Truthful description of the implemented section",
  "tags": ["Product", "Beauty"],
  "keywords": "shopify product grid skincare",
  "thumbnail": "./assets/your-real-section/thumbnail.webp",
  "previewDesktop": "./assets/your-real-section/desktop.webp",
  "previewMobile": "./assets/your-real-section/mobile.webp",
  "demoUrl": "",
  "new": true,
  "order": 1
}
```

**Do not publish until the Liquid section is complete and manually tested.** `published: true` plus valid section fields and a screenshot are required before a listing appears. A source image must be a real capture of the implementation, not AI-generated product artwork passed off as a preview.

## Figma-to-Liquid workflow

1. Receive the actual Figma file/link and check design permission and asset export rights.
2. Select an independent, reusable section (hero, products, etc.) from the Figma theme.
3. Implement `sections/<slug>.liquid`, including schema, settings, responsive CSS and necessary scoped JS.
4. Test in Shopify Dawn and at least one other target theme, including mobile and the theme editor.
5. Capture authentic desktop/mobile previews. Add only the preview assets and metadata to this public repo.
6. Keep protected paid Liquid ZIPs behind a proper authenticated payment/delivery backend. **Do not place paid source code in this public GitHub Pages repository.**

## Hosting & limits

This GitHub Pages site is a public frontend showcase, not an integrated checkout or secure download system. Checkout, protected file delivery, licences and customer login require a separate backend/payment provider.
