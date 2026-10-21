#!/usr/bin/env python3
"""Build the static portfolio from content/site-content.json (standard library only)."""
from html import escape
from hashlib import sha256
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/site-content.json').read_text())
BASE = 'https://rohkyoungmin.github.io'
CV = BASE + '/assets/Kyoungmin_Roh_CV.pdf'
PAGES = [
    ('index.html', 'About', 'Background and research interests.'),
    ('education.html', 'Education', 'Education history.'),
    ('experience.html', 'Experience', 'Research appointments and military service.'),
    ('publications.html', 'Publications', 'Published papers and manuscripts.'),
    ('patents.html', 'Patents', 'Filed patent applications and patents in preparation.'),
    ('projects.html', 'Projects', 'Security tools, AI applications, and research software.'),
    ('awards.html', 'Awards', 'Awards and scholarships.'),
    ('participation.html', 'Gallery', 'Conferences, presentations, and moments from the journey.'),
    ('certificate.html', 'Certificate', 'Language proficiency and certificates.'),
]
PROJECT_TYPES = [
    ('coursework', 'Coursework Project', 'Course assignments, team projects, and capstone work.'),
    ('research', 'Research Project', 'Research prototypes, published methods, and experimental software.'),
    ('funded', 'Funded Research Project', 'Contributions to commissioned and funded research programs.'),
    ('competition', 'Competition Project', 'Projects developed for competitions and hackathons.'),
    ('personal', 'Personal Project', 'Independent applications and applied experiments.'),
    ('toy', 'Toy Project', 'Small utilities and focused programming experiments.'),
]

def e(value):
    return escape(str(value if value is not None else ''), quote=True)

def external(url, text, cls=''):
    return f'<a href="{e(url)}" class="{e(cls)}" target="_blank" rel="noopener noreferrer">{text}</a>'

def head(title, description, path='', prefix='', active=''):
    style_version=sha256((ROOT/'css/portfolio.css').read_bytes()).hexdigest()[:12]
    script_version=sha256((ROOT/'js/portfolio.js').read_bytes()).hexdigest()[:12]
    navigation=''.join(
        f'<a href="{prefix}{route}"'+(' class="nav-gallery"' if route=='participation.html' else '')+(' aria-current="page"' if route==active else '')+f'>{label}</a>'
        for route,label,_ in PAGES if route!='certificate.html'
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
  <meta property="og:image" content="{BASE}/assets/profile-kyoungmin-roh.jpg">
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
    <a href="{prefix}index.html" class="brand" aria-label="Kyoungmin Roh, home"><span class="brand-name">Kyoungmin Roh</span></a>
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
    labels=pub.get('badges',[])+([pub['award']] if pub.get('award') else [])
    award=''.join(f'<span class="pub-award">{e(label)}</span>' for label in labels)
    return f'''<article class="publication" data-category="{category}" data-publication-status="{publication_status(pub)}"><p class="mono pub-year">{e(pub.get('year') or '—')}</p><div><h3 class="pub-title">{title}</h3><p class="pub-authors">{authors}</p><p class="pub-meta">{e(pub['venue'])}</p>{award}</div><div class="pub-links">{''.join(links)}</div></article>'''

def project_row(project, number):
    badges=''.join(f'<span class="pub-award">{e(label)}</span>' for label in project.get('badges',[]))
    badges=f'<div class="project-badges">{badges}</div>' if badges else ''
    role = f'<p class="project-role">Role: {e(project["role"])}</p>' if project.get('role') else ''
    context = f'<p class="project-context">{e(project["context"])}</p>' if project.get('context') else ''
    funding = f'<p class="project-context">Commissioned by: {e(project["commissionedBy"])}</p>' if project.get('commissionedBy') else ''
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
    return f'''<article id="project-{e(project['id'])}" class="project-row" data-project-type="{e(project['projectType'])}"><span class="mono number">{number:02d}</span><div><h3>{e(project['title'])}</h3><div class="tag">{e(' / '.join(project['tags']))}</div>{badges}{context}</div><div class="project-description"><p>{e(project['description'])}</p>{funding}{role}<div class="project-resource-links">{''.join(links)}</div></div></article>'''

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
        <img class="portrait" src="assets/profile-kyoungmin-roh.jpg" width="1179" height="1462" alt="Portrait of Kyoungmin Roh" decoding="async">
        <h3 class="profile-name">Kyoungmin Roh</h3>
        <p class="profile-role">{e(DATA['profileRole'])}</p>
        <p class="profile-location">South Korea</p>
        <div class="profile-links">{external('https://scholar.google.com/citations?user=6O2OMlwAAAAJ','Google Scholar ↗')}{external('https://github.com/rohkyoungmin','GitHub ↗')}{external('https://www.linkedin.com/in/kyoungmin-roh-88bb09343/','LinkedIn ↗')}</div>
      </aside>
      <div class="professional-summary">
        <p class="summary-label">Summary</p>
        <p class="about-summary">{e(DATA['professionalSummary'])}</p>
        <p class="about-affiliation">{e(DATA['currentAffiliation'])}</p>
        <div class="about-links">{external(CV,'Curriculum vitae <span aria-hidden="true">↗</span>','pill-link')}</div>
      </div>
    </div>
  </section>
  <nav class="page-directory" aria-label="Explore portfolio">{''.join(f'<a class="page-link{' page-link-gallery' if route=='participation.html' else ''}" href="{route}"><span><strong>{label}</strong><small>{description}</small></span><span aria-hidden="true">↗</span></a>' for route,label,description in PAGES[1:])}</nav>
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
    research_experience=''.join(experience_row(item) for item in DATA['experience'] if item['type']=='Research')
    military_service=''.join(experience_row(item) for item in DATA['experience'] if item['type']=='Military')
    published=[pub for pub in DATA['publications'] if publication_status(pub)=='published']
    unpublished=[pub for pub in DATA['publications'] if publication_status(pub)=='unpublished']
    ordered_publications=published+unpublished
    publications=''.join(publication_row(pub) for pub in ordered_publications)
    awards=''.join(award_row(award) for award in DATA['awards'])
    scholarships=''.join(scholarship_row(item) for item in DATA['scholarships'])
    write_page('experience.html','Experience','Research appointments and military service of Kyoungmin Roh.',f'''  <section id="experience" class="section experience-section" aria-labelledby="experience-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">03 / EXPERIENCE</p><h1 id="experience-title" class="section-title">Experience</h1></div><p>Research and military service.</p></div>
    <section id="research-experience" class="experience-group" aria-labelledby="research-experience-title"><h2 id="research-experience-title" class="experience-group-title">Research Experience</h2><div class="timeline">{research_experience}</div></section>
    <section id="military-service" class="experience-group" aria-labelledby="military-service-title"><h2 id="military-service-title" class="experience-group-title">Military Service</h2><div class="timeline">{military_service}</div></section>
  </section>
''')
    write_page('education.html','Education','Kyoungmin Roh’s education at Dankook University.',f'''  <section id="education" class="section education-section" aria-labelledby="education-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">02 / EDUCATION</p><h1 id="education-title" class="section-title">Education</h1></div></div>
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
    write_page('awards.html','Awards & Scholarships','Research awards, scholarships, and military honors of Kyoungmin Roh.',f'''  <section id="recognition" class="section" aria-labelledby="recognition-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">07 / RECOGNITION</p><h1 id="recognition-title" class="section-title">Awards<sup>{len(DATA['awards']):02d}</sup></h1><p class="about-note">Research, competitions, and military service.</p><div class="recognition-links"><a class="text-link" href="#scholarships">Scholarships ↓</a></div></div><div>{awards}</div></div></section>
  <section id="scholarships" class="section" aria-labelledby="scholarships-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">08 / SCHOLARSHIPS</p><h2 id="scholarships-title" class="section-title">Scholarships<sup>{len(DATA['scholarships']):02d}</sup></h2><p class="about-note">Academic merit, research, and project scholarships.</p></div><div>{scholarships}</div></div></section>
''')


def build_patents():
    entries=[]
    for number,patent in enumerate(DATA['patents'],1):
        inventors=', '.join('<strong>Kyoungmin Roh</strong>' if name=='Kyoungmin Roh' else e(name) for name in patent['inventors'])
        entries.append(f'''<article id="patent-{number}" class="patent-entry"><p class="patent-year mono muted">{patent['year']}</p><div class="patent-details"><h2>{e(patent['title'])}</h2><p class="patent-title-ko" lang="ko">{e(patent['titleKorean'])}</p><p class="pub-authors">{inventors}</p><p class="patent-reference">{e(patent['reference'])}</p></div><span class="patent-status">{e(patent['status'])}</span></article>''')
    body=f'''<section id="patents" class="section" aria-labelledby="patents-title"><div class="section-heading"><div><p class="eyebrow section-kicker">05 / PATENTS</p><h1 id="patents-title" class="section-title">Patents<sup>{len(DATA['patents']):02d}</sup></h1></div><p>Filed patent applications and patents in preparation.</p></div><div class="patent-list">{''.join(entries)}</div><p class="pub-status-note">The order of inventors does not reflect their level of contribution.</p></section>'''
    write_page('patents.html','Patents','Filed patent applications and patents in preparation by Kyoungmin Roh.',body)


def build_projects():
    known_types={key for key,_,_ in PROJECT_TYPES}
    assert all(project['projectType'] in known_types for project in DATA['projects']), 'Every project needs a valid projectType.'
    navigation=[]
    groups=[]
    for key,label,description in PROJECT_TYPES:
        projects=[project for project in DATA['projects'] if project['projectType']==key]
        slug=key+'-project' if key!='funded' else 'funded-research-project'
        navigation.append(f'<a class="project-category-link" href="#{slug}"><span>{e(label)}</span><span class="project-category-count">{len(projects):02d}</span></a>')
        rows=''.join(project_row(project,number) for number,project in enumerate(projects,1))
        groups.append(f'<section id="{slug}" class="project-group" aria-labelledby="{slug}-title"><div class="project-group-heading"><h2 id="{slug}-title" class="project-group-title">{e(label)}<sup>{len(projects):02d}</sup></h2><p>{e(description)}</p></div><div>{rows}</div></section>')
    body=f'''<section id="projects" class="section" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow section-kicker">06 / PROJECTS &amp; TOOLS</p><h1 id="projects-title" class="section-title">Projects<sup>{len(DATA['projects']):02d}</sup></h1></div><p>Coursework, research, funded programs, competitions, and independent projects.</p></div><nav class="project-category-nav" aria-label="Project categories">{''.join(navigation)}</nav>{''.join(groups)}<div class="project-links">{external('https://github.com/rohkyoungmin?tab=repositories','GitHub repositories <span aria-hidden="true">↗</span>','text-link')}</div></section>'''
    write_page('projects.html','Projects','Coursework, research, funded research, competition, personal, and toy projects by Kyoungmin Roh.',body)


def build_participation():
    albums=[]
    photo_index=0
    for event in DATA['participation']:
        photos=[]
        for number,photo in enumerate(event['photos'],1):
            loading='eager' if photo_index==0 else 'lazy'
            photos.append(f'''<figure class="participation-photo"><a class="photo-open" href="{e(photo['src'])}" data-photo-index="{photo_index}" data-photo-caption="{e(photo['caption'])}" data-photo-album="{e(event['title'])}" aria-label="Open photograph {number}: {e(photo['caption'])}"><img src="{e(photo['src'])}" width="{photo['width']}" height="{photo['height']}" alt="{e(photo['alt'])}" loading="{loading}" decoding="async"></a><figcaption><span class="mono">{number:02d}</span><span>{e(photo['caption'])}</span></figcaption></figure>''')
            photo_index+=1
        paper_link=external(event['paperUrl'],'ALARM paper ↗','text-link')
        albums.append(f'''<article id="{e(event['id'])}" class="conference-album" aria-labelledby="{e(event['id'])}-title"><div class="conference-heading"><div class="conference-meta"><p class="eyebrow">CONFERENCE / {event['year']}</p><h2 id="{e(event['id'])}-title">{e(event['title'])}</h2><p class="conference-name">{e(event['name'])}</p><p class="mono">{e(event['period'])}<br>{e(event['location'])}</p>{paper_link}</div><div class="conference-summary"><p>{e(event['description'])}</p><p class="mono muted">{len(event['photos']):02d} PHOTOGRAPHS · SELECT TO ENLARGE</p></div></div><div class="participation-grid">{''.join(photos)}</div></article>''')
    body=f'''<section id="participation" class="section" aria-labelledby="participation-title"><div class="section-heading"><div><p class="eyebrow section-kicker">09 / GALLERY</p><h1 id="participation-title" class="section-title">Gallery</h1></div><p>Conferences, presentations, and moments from the journey.</p></div>{''.join(albums)}</section>
<dialog id="photo-viewer" class="photo-dialog" aria-labelledby="photo-viewer-title" aria-describedby="photo-viewer-caption"><div class="photo-viewer-header"><h2 id="photo-viewer-title">Conference photographs</h2><button type="button" class="photo-close" aria-label="Close photograph" autofocus>Close ×</button></div><div class="photo-viewer-body"><button type="button" class="photo-prev" aria-label="Previous photograph">←</button><img class="photo-viewer-image" alt=""><button type="button" class="photo-next" aria-label="Next photograph">→</button></div><p id="photo-viewer-caption" class="photo-viewer-caption"></p><p class="photo-position" role="status" aria-live="polite"></p></dialog>'''
    write_page('participation.html','Gallery','Conference participation, ALARM presentation, and photographs from ACM SAC 2026 by Kyoungmin Roh.',body)
    # Keep old bookmarks working without retaining the former gallery content.
    (ROOT/'gallery.html').write_text(f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gallery — Kyoungmin Roh</title><meta http-equiv="refresh" content="0;url=participation.html"><link rel="canonical" href="{BASE}/participation.html"><meta name="robots" content="noindex"></head><body><h1>Gallery</h1><p><a href="participation.html">View gallery →</a></p></body></html>''')


def build_certificates():
    cards=[]
    for certificate in DATA['certificates']:
        cards.append(f'''<article class="certificate-card" aria-labelledby="{e(certificate['id'])}-title"><div class="certificate-copy"><p class="eyebrow">LANGUAGE PROFICIENCY</p><h2 id="{e(certificate['id'])}-title">{e(certificate['title'])}</h2><p class="mono muted">Test date: <time datetime="{e(certificate['date'])}">{e(certificate['dateLabel'])}</time></p><p class="certificate-score">{e(certificate['summary'])}</p><p>{e(certificate['details'])}</p></div><a class="certificate-image-link" href="{e(certificate['image'])}" target="_blank" rel="noopener noreferrer" aria-label="View full-size {e(certificate['title'])} score report"><img class="certificate-image" src="{e(certificate['image'])}" width="{certificate['width']}" height="{certificate['height']}" alt="{e(certificate['alt'])}" decoding="async"><span class="text-link">View full-size score report ↗</span></a></article>''')
    body=f'''<section id="certificate" class="section" aria-labelledby="certificate-title"><div class="section-heading"><div><p class="eyebrow section-kicker">10 / CERTIFICATE</p><h1 id="certificate-title" class="section-title">Certificate</h1></div><p>Language proficiency and certificates.</p></div><div class="certificate-list">{''.join(cards)}</div></section>'''
    write_page('certificate.html','Certificate','Language proficiency and certificates of Kyoungmin Roh.',body)


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
    build_patents()
    build_projects()
    build_participation()
    build_certificates()
    build_cases()
    build_support()
    print('Built nine portfolio pages, four research pages, 404, sitemap, and robots.txt.')
