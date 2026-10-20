#!/usr/bin/env python3
"""Build the static portfolio from content/site-content.json (standard library only)."""
from html import escape
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/site-content.json').read_text())
BASE = 'https://rohkyoungmin.github.io'
CV = 'https://github.com/rohkyoungmin/CV/raw/main/Kyoungmin_Roh___CV.pdf'

def e(value):
    return escape(str(value if value is not None else ''), quote=True)

def external(url, text, cls=''):
    return f'<a href="{e(url)}" class="{e(cls)}" target="_blank" rel="noopener noreferrer">{text}</a>'

def head(title, description, path='', prefix=''):
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(description)}">
  <meta name="theme-color" content="#f4f3ed">
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
  <link rel="stylesheet" href="{prefix}css/portfolio.css">
  <script src="{prefix}js/portfolio.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="header wrap">
  <nav class="nav" aria-label="Main navigation">
    <a href="{prefix}index.html" class="brand" aria-label="Kyoungmin Roh, home"><span class="brand-mark">KR.</span><span class="brand-description">KYOUNGMIN ROH<br>RESEARCH &amp; SELECTED WORK</span></a>
    <button class="menu-button" aria-controls="main-navigation" aria-expanded="false" type="button">Menu +</button>
    <div id="main-navigation" class="nav-links">
      <a href="{prefix}index.html#work">Work</a><a href="{prefix}index.html#about">About</a><a href="{prefix}index.html#publications">Publications</a><a href="{prefix}index.html#contact">Contact</a>
      {external(CV, 'CV ↗')}
    </div>
  </nav>
</header>'''

def footer(prefix=''):
    profiles = ''.join(external(item['url'], e(item['label'])+' ↗') for item in DATA['profiles'])
    return f'''<section id="contact" class="contact wrap" aria-labelledby="contact-title">
  <p class="eyebrow">CONTACT / RESEARCH &amp; COLLABORATION</p>
  <h2 id="contact-title" class="contact-heading"><a href="mailto:{e(DATA['email'])}"><span>Let's connect.</span><span aria-hidden="true">↗</span></a></h2>
  <p class="contact-email"><a href="mailto:{e(DATA['email'])}">{e(DATA['email'])}</a></p>
  <div class="contact-bottom"><div class="social-links">{profiles}</div><a class="text-link" href="#top">Back to top <span class="arrow" aria-hidden="true">↑</span></a></div>
  <footer class="footer"><span>© 2026 Kyoungmin Roh</span><span>Cybersecurity · Machine learning · Systems</span></footer>
</section>
</body>
</html>'''

CARD_TITLES = {'cca':'Arm CCA / vECU', 'mlkem':'Split ML-KEM', 'scan':'SCAN', 'alarm':'ALARM'}
CARD_DESCS = {
  'cca':'Integrating Zephyr OS and Arm CCA for automotive virtual ECUs.',
  'mlkem':'Secret-dependent partitioning for post-quantum cryptography in embedded TEEs.',
  'scan':'Gaussian mixture clustering and adaptive thresholds for malware detection under drift.',
  'alarm':'Leiden communities and mixture-of-experts classification for Android malware.'
}

def research_card(case, number):
    slug=case['id']
    tag = {'cca':'ONGOING · SNU', 'mlkem':'KCC 2026', 'scan':'CMES 2026', 'alarm':'ACM SAC 2026'}[slug]
    return f'''<article class="research-card">
      <a href="research/{slug}.html" aria-label="Read {e(case['title'])}">
        <div class="art-frame"><img src="assets/{slug}.svg" width="1600" height="1100" alt="Conceptual illustration for {e(case['title'])}" loading="lazy"><span class="art-arrow" aria-hidden="true">↗</span></div>
        <div class="card-info"><div><p class="mono card-overline">{number:02d} / {e(case['category'])}</p><h3>{e(CARD_TITLES[slug])}</h3></div><span class="mono">{tag}</span></div>
        <p class="card-summary">{e(CARD_DESCS[slug])}</p>
      </a>
    </article>'''

def experience_row(item):
    dates=item['period'].replace(' – ', '<br>— ')
    title=e(item['organization'])
    if item.get('url'): title=external(item['url'],title+' ↗')
    return f'''<article class="timeline-item"><p class="mono timeline-date">{dates}</p><div><h3>{title}</h3><p class="role">{e(item['role'])}<br><span class="muted">{e(item['lab'])}</span></p><p class="description">{e(item['description'])}</p></div></article>'''

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
    return f'''<article class="publication" data-category="{category}"><p class="mono pub-year">{e(pub.get('year') or '—')}</p><div><h3 class="pub-title">{title}</h3><p class="pub-authors">{authors}</p><p class="pub-meta">{e(pub['venue'])}</p>{award}</div><div class="pub-links">{''.join(links)}</div></article>'''

def project_row(project, number):
    url=project['links'][0]['url']
    role = f' Role: {e(project["role"])}.' if project.get('role') else ''
    return f'''<a href="{e(url)}" target="_blank" rel="noopener noreferrer" class="project-row"><span class="mono number">{number:02d}</span><div><h3>{e(project['title'])}</h3><div class="tag">{e(' / '.join(project['tags']))}</div></div><div class="project-description"><p>{e(project['description'])}{role}</p></div><span class="arrow" aria-hidden="true">↗</span></a>'''

def award_row(award):
    return f'''<article class="award-row"><span class="mono muted">{e(award['date'])}</span><div><h3>{e(award['title'])}</h3><p>{e(award['organization'])} · {e(award['description'])}</p></div></article>'''

def build_home():
    research=''.join(research_card(case,i+1) for i,case in enumerate(DATA['caseStudies']))
    experience=''.join(experience_row(item) for item in DATA['experience'])
    publications=''.join(publication_row(pub) for pub in DATA['publications'])
    projects=''.join(project_row(project,i+1) for i,project in enumerate(DATA['projects']))
    selected_awards=[a for a in DATA['awards'] if any(t in a['title'] for t in ['KCC','KSC','WDSC','Army Commendation','Best KATUSA'])]
    awards=''.join(award_row(award) for award in selected_awards)
    patent=next(p for p in DATA['patents'] if p['status']=='Filed')
    text=head('Kyoungmin Roh — Cybersecurity, Machine Learning & Systems',DATA['summary'])
    text+=f'''<main id="main" class="wrap">
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="hero-top"><p class="eyebrow">CYBERSECURITY / MACHINE LEARNING / SYSTEMS</p><p class="mono location">Based in South Korea</p></div>
    <h1 id="hero-title" class="hero-name reveal">Kyoungmin<span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"> Roh</span></h1>
    <div class="hero-bottom-line"><span class="hero-name-last reveal" aria-hidden="true">Roh</span><div class="hero-statement"><p>Learning-based defenses.<br>Trustworthy systems.</p><p class="hero-detail">I study how machine learning and system design can strengthen security—from evolving Android malware to embedded cryptography and automotive computing.</p></div></div>
    <div class="hero-foot"><a class="text-link" href="#work">Explore selected work <span class="arrow" aria-hidden="true">↓</span></a><div class="hero-foot-right"><span class="mono">RESEARCH INTERN<br>SEOUL NATIONAL UNIVERSITY</span><span class="mono">SELECTED WORK<br>2025—2026</span></div></div>
  </section>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">01 / SELECTED WORK</p><h2 id="work-title" class="section-title">Research in<br>practice.<sup>(04)</sup></h2></div><p>Four investigations across machine learning, post-quantum cryptography, and the systems they run on.</p></div>
    <div class="research-grid">{research}</div>
    <div class="interest-strip" aria-label="Research interests"><span>Concept drift</span><span>Machine learning for security</span><span>Trusted execution environments</span><span>Confidential computing</span></div>
  </section>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">02 / ABOUT &amp; EXPERIENCE</p><h2 id="about-title" class="section-title">A closer look.</h2></div></div>
    <div class="about-layout"><div><p class="about-intro">I'm Kyoungmin, a cybersecurity researcher working across machine learning and systems security.</p><p class="about-note">My research asks how security mechanisms behave as data, software, and deployment conditions change. I work on Android malware detection, post-quantum cryptography in TEEs, and confidential computing for automotive systems.</p><div class="portrait-row"><img class="portrait" src="elements/Roh.jpg" width="88" height="104" alt="Portrait of Kyoungmin Roh" loading="lazy"><p>Research intern at Seoul National University.<br>Undergraduate at Dankook University.<br>Based in South Korea.</p></div><div class="about-links">{external(CV,'Curriculum vitae <span aria-hidden="true">↗</span>','text-link')}{external('https://scholar.google.com/citations?user=6O2OMlwAAAAJ','Google Scholar <span aria-hidden="true">↗</span>','text-link')}</div></div><div class="timeline">{experience}</div></div>
    <div class="edu-line"><p class="eyebrow">EDUCATION</p><div><h3>{e(DATA['education']['organization'])}</h3><p>{e(DATA['education']['degree'])}<br>{e(DATA['education']['period'])}</p></div></div>
  </section>
  <section id="publications" class="section" aria-labelledby="publications-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">03 / PUBLICATIONS</p><h2 id="publications-title" class="section-title">Papers &amp;<br>proceedings.</h2></div><p>Journal articles, conference papers, and work in progress. Publication status is shown for accepted and forthcoming work.</p></div>
    <div class="publication-tools"><div class="filter-buttons" role="group" aria-label="Filter publications"><button type="button" class="filter-button" data-publication-filter="all" aria-pressed="true">All</button><button type="button" class="filter-button" data-publication-filter="international" aria-pressed="false">International</button><button type="button" class="filter-button" data-publication-filter="domestic" aria-pressed="false">Domestic &amp; other</button></div><span id="publication-count" class="mono muted" role="status" aria-live="polite">{len(DATA['publications']):02d} entries</span></div>
    <div class="publication-list">{publications}</div><p class="pub-status-note">Authors are listed in contribution order. † Co-first authors.</p>
  </section>
  <section id="projects" class="section" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow section-kicker">04 / PROJECTS &amp; TOOLS</p><h2 id="projects-title" class="section-title">Built to explore.</h2></div><p>Security tools, AI applications, and research infrastructure developed through individual and team projects.</p></div><div>{projects}</div><div class="project-links">{external('https://github.com/rohkyoungmin?tab=repositories','More on GitHub <span aria-hidden="true">↗</span>','text-link')}</div></section>
  <section id="recognition" class="section" aria-labelledby="recognition-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">05 / RECOGNITION</p><h2 id="recognition-title" class="section-title">Along the way.</h2><p class="about-note">Selected recognition for research and military service.</p><div class="patent-block"><span class="eyebrow">PATENT APPLICATION / {patent['year']}</span><p>{e(patent['title'])}</p><p class="mono">{e(patent['reference'])}<br>{e(patent['status'])}</p></div></div><div>{awards}</div></div></section>
</main>'''
    text+=footer()
    schema={'@context':'https://schema.org','@type':'Person','name':DATA['name'],'url':BASE,'email':DATA['email'],'description':DATA['summary'],'sameAs':[p['url'] for p in DATA['profiles']]}
    text=text.replace('</head>',f'<script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script>\n</head>')
    (ROOT/'index.html').write_text(text)

def build_cases():
    folder=ROOT/'research'
    folder.mkdir(exist_ok=True)
    for i,case in enumerate(DATA['caseStudies']):
        slug=case['id']
        text=head(case['title']+' — Kyoungmin Roh',case['subtitle'],f'research/{slug}.html','../')
        meta=''.join(f'<div><span class="mono muted">{label}</span><p>{e(case[key])}</p></div>' for label,key in [('AREA','category'),('PERIOD','year'),('ROLE','role'),('STATUS','status')])
        blocks=''.join(f'<section class="case-section"><h2>{label}</h2><p>{e(case[key])}</p></section>' for label,key in [('The problem','problem'),('The approach','approach'),('My contribution','contribution'),('Outcome','outcome'),('Scope & limitations','limits')])
        resources=''.join(external(link['url'],e(link['label'])+' <span aria-hidden="true">↗</span>','pill-link') for link in case['links'])
        next_case=DATA['caseStudies'][(i+1)%len(DATA['caseStudies'])]
        text+=f'''<main id="main" class="wrap"><section id="top" class="case-hero"><a href="../index.html#work" class="back-link"><span aria-hidden="true">←</span> Selected research</a><h1 class="case-title">{e(case['title'])}</h1><p class="case-subtitle">{e(case['subtitle'])}</p><div class="case-meta">{meta}</div></section><figure class="case-art" style="margin:0"><img src="../assets/{slug}.svg" width="1600" height="1100" alt="Conceptual illustration for {e(case['title'])}"><figcaption class="art-caption">Conceptual illustration · Research overview and resources below.</figcaption></figure><div class="case-body">{blocks}<section class="case-section"><h2>Read &amp; explore</h2><div class="case-resource-links">{resources}</div></section></div><section class="next-case"><a href="{next_case['id']}.html"><div><span class="eyebrow">NEXT RESEARCH PROJECT</span><h2>{e(next_case['title'])}</h2></div><span class="arrow" aria-hidden="true">↗</span></a></section></main>'''
        text+=footer('../')
        (folder/f'{slug}.html').write_text(text)

def build_support():
    (ROOT/'.nojekyll').write_text('')
    (ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\n')
    urls=[BASE+'/']+[BASE+'/research/'+case['id']+'.html' for case in DATA['caseStudies']]
    (ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{url}</loc></url>' for url in urls)+'</urlset>\n')
    text=head('Page not found — Kyoungmin Roh','Return to Kyoungmin Roh’s research portfolio.','404.html','/')
    text+='''<main id="main" class="wrap not-found"><p class="eyebrow">PAGE NOT FOUND</p><h1 id="top">404.</h1><p>This page may have moved. Explore the latest research, publications, and projects from the homepage.</p><a class="pill-link" href="/">Return home <span aria-hidden="true">↗</span></a></main>'''
    text+=footer('/')
    text=text.replace('<link rel="canonical" href="'+BASE+'/404.html">','<meta name="robots" content="noindex">')
    (ROOT/'404.html').write_text(text)

if __name__=='__main__':
    build_home()
    build_cases()
    build_support()
    print('Built homepage, four research pages, 404, sitemap, and robots.txt.')
