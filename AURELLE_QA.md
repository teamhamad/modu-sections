# AURELLE — release-candidate QA

Date: 2026-11-14

## Verified in the working environment

- All 10 packaged Shopify Liquid sections were recovered and reviewed.
- Each section's `{% schema %}` parses as JSON, has unique setting identifiers, a preset, and block definitions where used.
- Scoped CSS for every section parses without top-level syntax errors.
- HTML wrapper counts were checked; `<style>`, `<script>`, and schema delimiters match.
- Responsive safeguards were improved at narrow mobile widths.
- Fixed invalid category CSS, missing-destination CTAs, and the testimonial's unsupported default “Verified buyer” label.
- A new **private seller ZIP bundle** was produced. It is deliberately **not** committed to public GitHub Pages.

## Not verified

- Real Shopify theme editor installation and storefront rendering: the Shopify theme-editing connection was not approved.
- Pixel-perfect correspondence with the Figma layouts: not independently verified in Shopify.
- Purchased-file delivery and checkout: no installed Digital Products app in the connected development shop; the intended commercial shop is not configured.
- Third-party image licences and compatibility across customer themes: not yet verified.

## Release table

| Section | Private package | Code review | Shopify test | Sale enabled |
|---|---|---|---|---|
| AURELLE Hero | `aurelle-editorial-hero.zip` | Local QA passed | Pending | No |
| AURELLE Category Gallery | `aurelle-category-gallery.zip` | Local QA passed | Pending | No |
| AURELLE New Arrivals | `aurelle-new-arrivals.zip` | Local QA passed | Pending | No |
| AURELLE Bestsellers | `aurelle-bestsellers.zip` | Local QA passed | Pending | No |
| AURELLE Promo Banners | `aurelle-promo-banners.zip` | Local QA passed | Pending | No |
| AURELLE Testimonials | `aurelle-testimonials.zip` | Local QA passed | Pending | No |
| AURELLE Editorial Blog | `aurelle-editorial-blog.zip` | Local QA passed | Pending | No |
| AURELLE Social Gallery | `aurelle-social-gallery.zip` | Local QA passed | Pending | No |
| AURELLE Newsletter | `aurelle-newsletter.zip` | Local QA passed | Pending | No |
| AURELLE Brand Footer | `aurelle-footer.zip` | Local QA passed | Pending | No |

## Next release gates

1. Approve testing in an **unpublished** QA theme, never overwrite a merchant's live theme.
2. Install each section and verify front end, theme editor, mobile, keyboard interaction, responsive behavior, products/articles/forms as applicable.
3. Capture accurate Shopify storefront screenshots and replace “design preview” assets.
4. Install Digital Products on the intended **commercial Shopify store**, attach each seller ZIP to its product, set seller-approved prices, and test paid fulfillment.
5. Only then set `published: true`, `shopifyTested: true`, and a genuine checkout URL for each listing.

The private code package is intentionally not accessible via this public repository.
