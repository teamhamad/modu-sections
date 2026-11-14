# Working agreement for future contributors

- Project: modu., an independent Shopify **section** marketplace (not a full theme store).
- Design: Plus Jakarta Sans; clean spacing; calm, premium type; centered hero with text and search only. **Never add images, mockups or illustrations to the hero.**
- Keep section-type filters separate from merchant industry filters (skincare, fashion, jewelry, etc.) and allow them to combine.
- Preserve working search, mobile responsiveness, sorting, preview modals, saving, and keyboard usability.
- Current catalog and prices are sample/demo data; do not represent checkout, downloads or Shopify Liquid products as live.
- Deploy via GitHub Pages on main. When Pages is not enabled, ask the repo owner to enable Settings → Pages → GitHub Actions.
- Before changing an existing design, review user requirements and provide screenshots/previews if available.


## Product integrity
- Never restore placeholder/sample catalog entries or invented prices, brands, testimonials, install claims, or screenshot previews.
- Public entries belong in `data/sections.json` with `published: true` only after the real section exists and has been tested.
- The hero MUST remain centered, text-only and without any imagery.
- Keep paid downloadable Liquid source out of this public repository; use authenticated delivery infrastructure.

## Paid product rules

Do not expose editable Figma designs, private Liquid ZIPs or direct download URLs. A Buy & download CTA appears only for a section with published=true, shopifyTested=true, a real positive price and a checkoutUrl. Fulfillment must use Shopify Digital Products or another authenticated commerce provider.
