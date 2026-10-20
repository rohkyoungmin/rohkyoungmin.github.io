# Kyoungmin Roh — Research portfolio

Personal portfolio published with GitHub Pages at https://rohkyoungmin.github.io/.

The site uses static HTML, CSS, JavaScript, and original SVG cover art. It needs no framework, package installation, server, or API keys.

## Update content

1. Edit `content/site-content.json` for publications, experience, awards, scholarships, projects, and research case studies.
2. Run `python scripts/build.py` from the repository root.
3. Commit the generated pages together with the content changes to `main`.

All publications appear in one list: published work first, followed by unpublished manuscripts (including accepted work awaiting publication and manuscripts in preparation). The International and Domestic filters show published work; the Unpublished filter shows all unpublished entries. Each manuscript retains its status.

The About introduction in `professionalSummary` is copied verbatim from the Notion Full CV’s Professional Summary. Preserve its wording when adjusting layout.

Projects, awards, and scholarships render in full, in content order. A project's application, frontend, backend, and related prototype repositories are shown as links under one entry. Scholarships include their recorded dates, organizations, descriptions, and KRW amounts.

The navigation opens independent pages: About (`index.html`), Experience, Education, Publications, Projects, Awards, and Gallery. Awards also contains scholarships and the filed patent application. Contact information remains at the bottom of every page. Old homepage section bookmarks redirect to their corresponding pages.

Styling lives in `css/portfolio.css`; mobile navigation, legacy bookmark redirects, and publication filters live in `js/portfolio.js`. Research artwork and the favicon are in `assets/`. The existing portrait is retained in `elements/Roh.jpg`. The supplied campus photograph is retained in full at `assets/dankook-campus.png`, displayed to the right of the education details on desktop and below them on mobile. Gallery items are configured in the `gallery` list in `content/site-content.json`.

CV links point to the PDF in the separate `rohkyoungmin/CV` repository. Content was reconciled with the public GitHub profile in October 2026. Keep publication status, award names, project roles, and benchmark conditions accurate when updating it.

## Pages deployment

The existing repository's GitHub Pages publishing source is retained. Root-level HTML files and `.nojekyll` support static branch publishing. The four research case studies are separate pages under `research/` and work without JavaScript. All seven portfolio pages and four research pages are included in `sitemap.xml`. Existing legacy assets remain available for older links.

## Accessibility

The site includes keyboard navigation, visible focus indicators, a skip link, descriptive image text, reduced-motion support, responsive layouts, and an accessible publication filter. All substantive content and research links are available without JavaScript.
