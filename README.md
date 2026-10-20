# Kyoungmin Roh — Research portfolio

Personal portfolio published with GitHub Pages at https://rohkyoungmin.github.io/.

The site uses static HTML, CSS, JavaScript, and original SVG cover art. It needs no framework, package installation, server, or API keys.

## Update content

1. Edit `content/site-content.json` for publications, experience, awards, projects, and research case studies.
2. Run `python scripts/build.py` from the repository root.
3. Commit the generated pages together with the content changes to `main`.

Styling lives in `css/portfolio.css`; mobile navigation and publication filters live in `js/portfolio.js`. Research artwork and the favicon are in `assets/`. The existing portrait is retained in `elements/Roh.jpg`.

CV links point to the PDF in the separate `rohkyoungmin/CV` repository. Content was reconciled with the public GitHub profile in October 2026. Keep publication status, award names, project roles, and benchmark conditions accurate when updating it.

## Pages deployment

The existing repository's GitHub Pages publishing source is retained. Root-level `index.html` and `.nojekyll` support static branch publishing. The four research case studies are separate pages under `research/` and work without JavaScript. Existing legacy assets remain available for older links.

## Accessibility

The site includes keyboard navigation, visible focus indicators, a skip link, descriptive image text, reduced-motion support, responsive layouts, and an accessible publication filter. All substantive content and research links are available without JavaScript.
