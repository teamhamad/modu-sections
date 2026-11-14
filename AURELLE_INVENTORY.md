# AURELLE Figma section inventory

Source: https://www.figma.com/design/UQN0gc5SKqjYygkwmb8Ar3/AURELLE-v-2-9d-brain--Copy---Copy-?node-id=2010-5581

This inventory lists the ten **individual section designs on the homepage canvas**. They have not been built or published as Shopify Liquid products. The repository's public catalog `data/sections.json` remains empty.

See `data/collections/aurelle.json` for each original node ID, section category, and development status.

## Planned conversion order

1. **AURELLE — Editorial Hero** — Figma node `2040:71` (Hero & banners)
2. **AURELLE — Category Gallery** — Figma node `2010:6112` (Collections)
3. **AURELLE — New Arrivals Grid** — Figma node `2010:5637` (Product sections)
4. **AURELLE — Bestseller Showcase** — Figma node `2010:5832` (Product sections)
5. **AURELLE — Promotional Banners** — Figma node `2010:5942` (Hero & banners)
6. **AURELLE — Customer Testimonials** — Figma node `2028:538` (Social proof)
7. **AURELLE — Editorial Blog** — Figma node `2010:6023` (Content & story)
8. **AURELLE — Social Gallery** — Figma node `2028:595` (Content & story)
9. **AURELLE — Newsletter Promotion** — Figma node `2010:6043` (Interactive)
10. **AURELLE — Brand Footer** — Figma node `2010:6057` (Content & story)

The newsletter and footer are distinct design frames. The header is part of the first hero composition; global header, cart and checkout layouts need separate handling because they are not standalone drop-in product sections.

For each item: inspect the Figma node, reproduce layout and asset positions, create the self-contained Liquid section with schema/presets, verify editor compatibility, test on mobile and Dawn, and only then publish a real marketplace listing. Never place paid source files in this public repository.
