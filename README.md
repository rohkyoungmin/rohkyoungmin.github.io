# Kyoungmin Roh — Research portfolio

Personal portfolio published with GitHub Pages at https://rohkyoungmin.github.io/.

The site uses static HTML, CSS, JavaScript, and original SVG cover art. It needs no framework, package installation, server, or API keys.

## Update content

1. Edit `content/site-content.json` for publications, experience, awards, scholarships, projects, and research case studies.
2. Run `python scripts/build.py` from the repository root.
3. Commit the generated pages together with the content changes to `main`.

All publications appear in one list: published work first, followed by unpublished manuscripts (including accepted work awaiting publication and manuscripts in preparation). The International and Domestic filters show published work; the Unpublished filter shows all unpublished entries. Each manuscript retains its status.

The About introduction in `professionalSummary` is copied verbatim from the Notion Full CV’s Professional Summary. Preserve its wording when adjusting layout.

Projects, awards, and scholarships render in full, in content order. Projects are grouped by `projectType` into Coursework Project, Research Project, Funded Research Project, Competition Project, Personal Project, and Toy Project. Each project appears once; related application, frontend, backend, and prototype repositories remain links under the same entry. Course and funding context is reconciled with the current Notion Full CV. Personal/Toy and research-tool classifications use the project's purpose and scope where Notion does not supply a literal category; `classificationBasis` and `classificationSource` record that distinction. LV.0 and TTobak are competition projects, as requested. Scholarships include their recorded dates, organizations, descriptions, and KRW amounts.

Experience separates Research Experience from Military Service using each entry's `type`. The homepage's current affiliation comes from `currentAffiliation`, independently of historical appointments. Contact links and the Person metadata use the single `email` field.

The navigation opens independent pages: About (`index.html`), Experience, Education, Publications, Projects, Awards, Participation, and Certificate. Awards also contains scholarships and the filed patent application. Contact information remains at the bottom of every page. Old homepage section bookmarks redirect to their corresponding pages. The former `gallery.html` is a redirect to Participation.

Styling lives in `css/portfolio.css`; mobile navigation, legacy bookmark redirects, publication filters, and the photo viewer live in `js/portfolio.js`. Research artwork and the favicon are in `assets/`. The current profile photograph is stored at `assets/profile-kyoungmin-roh.jpg` and displayed in a consistent 4:5 frame; the former portrait file has been removed. The supplied campus photograph is retained in full at `assets/dankook-campus.png`, displayed to the right of the education details on desktop and below them on mobile.

Conference albums are configured in the `participation` list in `content/site-content.json`. Each event includes its name, period, location, description, paper link, and ordered photographs with captions, alt text, and image dimensions. The ACM SAC 2026 album contains all 16 supplied photographs, with presentation and conference photos first, followed by travel photos. WebP copies under `assets/participation/acm-sac-2026/` use a maximum size of 1440 × 1800 pixels. The album thumbnails use uniform 3:4 frames; the photo viewer displays each complete image in its original proportions. To add an event, add its photo assets and append a new event object, then rebuild. Photographs open in a keyboard-accessible dialog (←/→ to navigate, Escape to close); without JavaScript, the links open the image directly.

CV links point to `assets/Kyoungmin_Roh_CV.pdf`, the replacement PDF supplied in October 2026. The site no longer links the previous PDF in the separate CV repository. The Certificate page reads the `certificates` list and displays each supplied score report in full, with a link to its original image. Certificate images are stored under `assets/certificates/`. Content was reconciled with the public GitHub profile in October 2026. Keep publication status, award names, project roles, and benchmark conditions accurate when updating it.

## Pages deployment

The existing repository's GitHub Pages publishing source is retained. Root-level HTML files and `.nojekyll` support static branch publishing. The four research case studies are separate pages under `research/` and work without JavaScript. All eight portfolio pages and four research pages are included in `sitemap.xml`. Existing legacy assets remain available for older links.

## Accessibility

The site includes keyboard navigation, visible focus indicators, a skip link, descriptive image text, reduced-motion support, responsive layouts, and an accessible publication filter. All substantive content and research links are available without JavaScript.
