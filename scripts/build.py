#!/usr/bin/env python3
"""Build the static portfolio from content/site-content.json (standard library only)."""
from html import escape
from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/site-content.json').read_text())
BASE = 'https://rohkyoungmin.github.io'
CV = 'https://github.com/rohkyoungmin/CV/raw/main/Kyoungmin_Roh___CV.pdf'
PAGES = [
    ('index.html', 'About', 'Background and research interests.'),
    ('experience.html', 'Experience', 'Research appointments and military service.'),
    ('education.html', 'Education', 'Dankook University.'),
    ('publications.html', 'Publications', 'Published papers and manuscripts.'),
    ('projects.html', 'Projects', 'Security tools, AI applications, and research software.'),
    ('awards.html', 'Awards', 'Awards, scholarships, and patent application.'),
    ('gallery.html', 'Gallery', 'A visual record of people and places.'),
]

def e(value):
    return escape(str(value if value is not None else ''), quote=True)

def external(url, text, cls=''):
    return f'<a href="{e(url)}" class="{e(cls)}" target="_blank" rel="noopener noreferrer">{text}</a>'

def head(title, description, path='', prefix='', active=''):
    style_version=sha256((ROOT/'css/portfolio.css').read_bytes()).hexdigest()[:12]
    script_version=sha256((ROOT/'js/portfolio.js').read_bytes()).hexdigest()[:12]
    navigation=''.join(
        f'<a href="{prefix}{route}"'+(' aria-current="page"' if route==active else '')+f'>{label}</a>'
        for route,label,_ in PAGES
    )
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(description)}">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="{BASE}/{e(path)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{e(title)}">
  <meta property="og:description" content="{e(description)}">
  <meta property="og:url" content="{BASE}/{e(path)}">
  <meta property="og:image" content="{BASE}/elements/Roh.jpg">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="{prefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="{prefix}css/portfolio.css?v={style_version}">
  <script src="{prefix}js/portfolio.js?v={script_version}" defer></script>
  <noscript><style>.menu-button{{display:none}}.nav{{flex-wrap:wrap}}.nav-links{{display:flex;position:static;width:100%;padding:0 0 18px;border:0;flex-wrap:wrap}}</style></noscript>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header id="top" class="header wrap">
  <nav class="nav" aria-label="Main navigation">
    <a href="{prefix}index.html" class="brand" aria-label="Kyoungmin Roh, home"><span class="brand-mark">KR.</span><span class="brand-description">KYOUNGMIN ROH<br>RESEARCH &amp; SELECTED WORK</span></a>
    <button class="menu-button" aria-controls="main-navigation" aria-expanded="false" type="button">Menu +</button>
    <div id="main-navigation" class="nav-links">
      {navigation}<a href="#contact">Contact</a>
      {external(CV, 'CV ↗')}
    </div>
  </nav>
</header>'''

def footer(prefix=''):
    profiles = ''.join(external(item['url'], e(item['label'])+' ↗') for item in DATA['profiles'])
    return f'''<section id="contact" class="contact wrap" aria-labelledby="contact-title">
  <h2 id="contact-title" class="contact-heading">Contact</h2>
  <p class="contact-email"><a href="mailto:{e(DATA['email'])}">{e(DATA['email'])}</a></p>
  <div class="contact-bottom"><div class="social-links">{profiles}</div><a class="text-link" href="#top">Back to top <span class="arrow" aria-hidden="true">↑</span></a></div>
  <footer class="footer"><span>© 2026 Kyoungmin Roh</span><span>Cybersecurity · Machine learning · Systems</span></footer>
</section>
</body>
</html>'''

def experience_row(item):
    dates=e(item['period'])
    title=e(item['organization'])
    if item.get('url'): title=external(item['url'],title+' ↗')
    return f'''<article class="timeline-item"><p class="mono timeline-date">{dates}</p><div class="timeline-position"><h3>{title}</h3><p class="role">{e(item['role'])}<br><span class="muted">{e(item['lab'])}</span></p></div><p class="description">{e(item['description'])}</p></article>'''

def publication_status(pub):
    return 'published' if pub['status'].strip().casefold()=='published' else 'unpublished'

def publication_row(pub):
    category='international' if pub['category'].startswith('International') else 'domestic'
    title=e(pub['title'])
    if pub.get('url'): title=external(pub['url'],title)
    def author_label(name):
        clean=name.replace('†','').strip()
        label='<strong>Kyoungmin Roh</strong>' if clean=='Kyoungmin Roh' else e(clean)
        cofirst='†' in name or (pub['id']=='mlkem' and clean in ['Kyoungmin Roh','Nahee Kwon'])
        return label+('<sup>†</sup>' if cofirst else '')
    authors=', '.join(author_label(name) for name in pub['authors'])
    links=[]
    if pub.get('url'): links.append(external(pub['url'],'Paper ↗'))
    if pub.get('code'): links.append(external(pub['code'],'Code ↗'))
    status=pub['status']
    if status != 'Published': links.append(f'<span class="status">{e(status)}</span>')
    award=f'<span class="pub-award">{e(pub["award"])}</span>' if pub.get('award') else ''
    return f'''<article class="publication" data-category="{category}" data-publication-status="{publication_status(pub)}"><p class="mono pub-year">{e(pub.get('year') or '—')}</p><div><h3 class="pub-title">{title}</h3><p class="pub-authors">{authors}</p><p class="pub-meta">{e(pub['venue'])}</p>{award}</div><div class="pub-links">{''.join(links)}</div></article>'''

def project_row(project, number):
    role = f'<p class="project-role">Role: {e(project["role"])}</p>' if project.get('role') else ''
    links=[]
    for link in project['links']:
        label=e(link['label'])
        if link['url'].startswith('https://'):
            links.append(external(link['url'],label+' ↗'))
        else:
            links.append(f'<a href="{e(link["url"])}">{label} →</a>')
    case_slug={'scan':'scan','alarm':'alarm','mlkem-split':'mlkem'}.get(project['id'])
    if case_slug:
        links.append(f'<a href="research/{case_slug}.html">Research details →</a>')
    return f'''<article id="project-{e(project['id'])}" class="project-row"><span class="mono number">{number:02d}</span><div><h3>{e(project['title'])}</h3><div class="tag">{e(' / '.join(project['tags']))}</div></div><div class="project-description"><p>{e(project['description'])}</p>{role}<div class="project-resource-links">{''.join(links)}</div></div></article>'''

def award_row(award):
    return f'''<article class="award-row"><span class="mono muted">{e(award['date'])}</span><div><h3>{e(award['title'])}</h3><p>{e(award['organization'])} · {e(award['description'])}</p></div></article>'''

def scholarship_row(item):
    amount=f'KRW {item["amountKrw"]:,}'
    return f'''<article class="award-row scholarship-row"><span class="mono muted">{e(item['date'])}</span><div><h3>{e(item['title'])}</h3><p>{e(item['organization'])}</p><p>{e(item['description'])}</p><p class="scholarship-amount">{amount}</p></div></article>'''

def build_home():
    text=head('Kyoungmin Roh — Cybersecurity, Machine Learning & Systems',DATA['summary'],active='index.html')
    text+=f'''<main id="main" class="wrap">
  <section id="about" class="section about-first" aria-labelledby="about-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">01 / ABOUT</p><h1 id="about-title" class="section-title">About</h1></div></div>
    <div class="about-layout">
      <aside class="profile-card" aria-label="Profile">
        <img class="portrait" src="elements/Roh.jpg" width="160" height="192" alt="Portrait of Kyoungmin Roh" decoding="async">
        <h3 class="profile-name">Kyoungmin Roh</h3>
        <p class="profile-role">{e(DATA['profileRole'])}</p>
        <p class="profile-location">South Korea</p>
        <div class="profile-links">{external('https://github.com/rohkyoungmin','GitHub ↗')}{external('https://www.linkedin.com/in/kyoungmin-roh-88bb09343/','LinkedIn ↗')}</div>
      </aside>
      <div class="professional-summary">
        <p class="summary-label">Summary</p>
        <p class="about-summary">{e(DATA['professionalSummary'])}</p>
        <p class="about-affiliation">Research Intern · Seoul National University<br>Undergraduate · Dankook University</p>
        <div class="about-links">{external(CV,'Curriculum vitae <span aria-hidden="true">↗</span>','pill-link')}{external('https://scholar.google.com/citations?user=6O2OMlwAAAAJ','Google Scholar <span aria-hidden="true">↗</span>','pill-link')}</div>
      </div>
    </div>
  </section>
  <nav class="page-directory" aria-label="Explore portfolio">{''.join(f'<a class="page-link" href="{route}"><span><strong>{label}</strong><small>{description}</small></span><span aria-hidden="true">↗</span></a>' for route,label,description in PAGES[1:])}</nav>
</main>'''
    text+=footer()
    schema={'@context':'https://schema.org','@type':'Person','name':DATA['name'],'url':BASE,'email':DATA['email'],'description':DATA['summary'],'sameAs':[p['url'] for p in DATA['profiles']]}
    text=text.replace('</head>',f'<script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script>\n</head>')
    (ROOT/'index.html').write_text(text)

def write_page(route, title, description, body):
    text=head(title+' — Kyoungmin Roh',description,route,active=route)
    text+='<main id="main" class="wrap">'+body+'</main>'+footer()
    (ROOT/route).write_text(text)


def build_sections():
    experience=''.join(experience_row(item) for item in DATA['experience'])
    published=[pub for pub in DATA['publications'] if publication_status(pub)=='published']
    unpublished=[pub for pub in DATA['publications'] if publication_status(pub)=='unpublished']
    ordered_publications=published+unpublished
    publications=''.join(publication_row(pub) for pub in ordered_publications)
    projects=''.join(project_row(project,i+1) for i,project in enumerate(DATA['projects']))
    awards=''.join(award_row(award) for award in DATA['awards'])
    scholarships=''.join(scholarship_row(item) for item in DATA['scholarships'])
    patent=next(p for p in DATA['patents'] if p['status']=='Filed')
    write_page('experience.html','Experience','Research appointments and military service of Kyoungmin Roh.',f'''  <section id="experience" class="section experience-section" aria-labelledby="experience-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">02 / EXPERIENCE</p><h1 id="experience-title" class="section-title">Experience</h1></div><p>Research and military service.</p></div>
    <div class="timeline">{experience}</div>
  </section>
''')
    write_page('education.html','Education','Kyoungmin Roh’s education at Dankook University.',f'''  <section id="education" class="section education-section" aria-labelledby="education-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">03 / EDUCATION</p><h1 id="education-title" class="section-title">Education</h1></div></div>
    <div class="education-layout">
      <div class="education-details"><div><h3>{e(DATA['education']['organization'])}</h3><p>{e(DATA['education']['degree'])}</p></div><p class="education-period">{e(DATA['education']['period'])}</p><p class="education-location">{e(DATA['education']['location'])}</p></div>
      <figure class="education-photo"><img src="assets/dankook-campus.png" width="1024" height="768" alt="Dankook University campus with the DKU monument and surrounding buildings" decoding="async"><figcaption>Dankook University</figcaption></figure>
    </div>
  </section>
''')
    write_page('publications.html','Publications','Published research papers and unpublished manuscripts by Kyoungmin Roh.',f'''  <section id="publications" class="section" aria-labelledby="publications-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">04 / PUBLICATIONS</p><h1 id="publications-title" class="section-title">Publications</h1></div><p>Published papers and manuscripts, with publication status indicated.</p></div>
    <div class="publication-tools"><div class="filter-buttons" role="group" aria-label="Filter publications"><button type="button" class="filter-button" data-publication-filter="all" aria-pressed="true">All</button><button type="button" class="filter-button" data-publication-filter="international" aria-pressed="false">International</button><button type="button" class="filter-button" data-publication-filter="domestic" aria-pressed="false">Domestic</button><button type="button" class="filter-button" data-publication-filter="unpublished" aria-pressed="false">Unpublished</button></div><span id="publication-count" class="mono muted" role="status" aria-live="polite">{len(ordered_publications):02d} entries</span></div>
    <div class="publication-list">{publications}</div><p class="pub-status-note">Authors are listed in contribution order. † Co-first authors.</p>
  </section>
''')
    write_page('projects.html','Projects','Security tools, AI applications, and research software by Kyoungmin Roh.',f'''  <section id="projects" class="section" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow section-kicker">05 / PROJECTS &amp; TOOLS</p><h1 id="projects-title" class="section-title">Projects<sup>{len(DATA['projects']):02d}</sup></h1></div><p>Security tools, AI applications, and research software.</p></div><div>{projects}</div><div class="project-links">{external('https://github.com/rohkyoungmin?tab=repositories','GitHub repositories <span aria-hidden="true">↗</span>','text-link')}</div></section>
''')
    write_page('awards.html','Awards & Scholarships','Research awards, scholarships, military honors, and patent application of Kyoungmin Roh.',f'''  <section id="recognition" class="section" aria-labelledby="recognition-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">06 / RECOGNITION</p><h1 id="recognition-title" class="section-title">Awards<sup>{len(DATA['awards']):02d}</sup></h1><p class="about-note">Research, competitions, and military service.</p><div class="recognition-links"><a class="text-link" href="#scholarships">Scholarships ↓</a></div><div class="patent-block"><span class="eyebrow">PATENT APPLICATION / {patent['year']}</span><p>{e(patent['title'])}</p><p class="mono">{e(patent['reference'])}<br>{e(patent['status'])}</p></div></div><div>{awards}</div></div></section>
  <section id="scholarships" class="section" aria-labelledby="scholarships-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">07 / SCHOLARSHIPS</p><h2 id="scholarships-title" class="section-title">Scholarships<sup>{len(DATA['scholarships']):02d}</sup></h2><p class="about-note">Academic merit, research, and project scholarships.</p></div><div>{scholarships}</div></div></section>
''')


def build_gallery():
    items=''.join(
        f'<figure class="gallery-item"><a href="{e(item["src"])}" aria-label="View full image: {e(item["title"])}"><img src="{e(item["src"])}" width="{item["width"]}" height="{item["height"]}" alt="{e(item["alt"])}" loading="lazy" decoding="async"></a><figcaption><h2>{e(item["title"])}</h2><p>{e(item["caption"])}</p></figcaption></figure>'
        for item in DATA['gallery']
    )
    body=f'''<section id="gallery" class="section" aria-labelledby="gallery-title"><div class="section-heading"><div><p class="eyebrow section-kicker">08 / GALLERY</p><h1 id="gallery-title" class="section-title">Gallery</h1></div><p>People and places. Select a photograph to view the full image.</p></div><div class="gallery-grid">{items}</div></section>'''
    write_page('gallery.html','Gallery','Photographs from Kyoungmin Roh’s portfolio.',body)


def build_cases():
    folder=ROOT/'research'
    folder.mkdir(exist_ok=True)
    for i,case in enumerate(DATA['caseStudies']):
        slug=case['id']
        text=head(case['title']+' — Kyoungmin Roh',case['subtitle'],f'research/{slug}.html','../',active='projects.html')
        meta=''.join(f'<div><span class="mono muted">{label}</span><p>{e(case[key])}</p></div>' for label,key in [('AREA','category'),('PERIOD','year'),('ROLE','role'),('STATUS','status')])
        blocks=''.join(f'<section class="case-section"><h2>{label}</h2><p>{e(case[key])}</p></section>' for label,key in [('Problem','problem'),('Approach','approach'),('Contribution','contribution'),('Results','outcome'),('Scope & limitations','limits')])
        resources=''.join(external(link['url'],e(link['label'])+' <span aria-hidden="true">↗</span>','pill-link') for link in case['links'])
        next_case=DATA['caseStudies'][(i+1)%len(DATA['caseStudies'])]
        text+=f'''<main id="main" class="wrap"><section class="case-hero"><a href="../publications.html" class="back-link"><span aria-hidden="true">←</span> Publications</a><h1 class="case-title">{e(case['title'])}</h1><p class="case-subtitle">{e(case['subtitle'])}</p><div class="case-meta">{meta}</div></section><figure class="case-art" style="margin:0"><img src="../assets/{slug}.svg" width="1600" height="1100" alt="Conceptual illustration for {e(case['title'])}"><figcaption class="art-caption">Conceptual illustration</figcaption></figure><div class="case-body">{blocks}<section class="case-section"><h2>Resources</h2><div class="case-resource-links">{resources}</div></section></div><section class="next-case"><a href="{next_case['id']}.html"><div><span class="eyebrow">NEXT PROJECT</span><h2>{e(next_case['title'])}</h2></div><span class="arrow" aria-hidden="true">↗</span></a></section></main>'''
        text+=footer('../')
        (folder/f'{slug}.html').write_text(text)

def build_support():
    (ROOT/'.nojekyll').write_text('')
    (ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\n')
    urls=[BASE+'/']+[BASE+'/'+route for route,_,_ in PAGES[1:]]+[BASE+'/research/'+case['id']+'.html' for case in DATA['caseStudies']]
    (ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{url}</loc></url>' for url in urls)+'</urlset>\n')
    text=head('Page not found — Kyoungmin Roh','Return to Kyoungmin Roh’s research portfolio.','404.html','/')
    text+='''<main id="main" class="wrap not-found"><p class="eyebrow">PAGE NOT FOUND</p><h1>404.</h1><p>This page may have moved. Explore the latest research, publications, and projects from the homepage.</p><a class="pill-link" href="/">Return home <span aria-hidden="true">↗</span></a></main>'''
    text+=footer('/')
    text=text.replace('<link rel="canonical" href="'+BASE+'/404.html">','<meta name="robots" content="noindex">')
    (ROOT/'404.html').write_text(text)

if __name__=='__main__':
    build_home()
    build_sections()
    build_gallery()
    build_cases()
    build_support()
    print('Built seven portfolio pages, four research pages, 404, sitemap, and robots.txt.')
