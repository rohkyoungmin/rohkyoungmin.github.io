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
      <a href="{prefix}index.html#about">About</a><a href="{prefix}index.html#work">Research</a><a href="{prefix}index.html#publications">Publications</a><a href="{prefix}index.html#contact">Contact</a>
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

CARD_TITLES = {'cca':'Arm CCA / vECU', 'mlkem':'Split ML-KEM', 'scan':'SCAN', 'alarm':'ALARM'}
CARD_DESCS = {
  'cca':'Integrating Zephyr OS and Arm CCA for automotive virtual ECUs.',
  'mlkem':'Secret-dependent partitioning for post-quantum cryptography in embedded TEEs.',
  'scan':'Gaussian mixture clustering and adaptive thresholds for malware detection under drift.',
  'alarm':'Leiden communities and mixture-of-experts classification for Android malware.'
}

def research_summary(case, number):
    slug=case['id']
    return f'''<a href="research/{slug}.html" class="research-summary-row"><span class="mono muted">{number:02d}</span><div><h3>{e(CARD_TITLES[slug])}</h3><p>{e(CARD_DESCS[slug])}</p></div><div class="research-summary-meta"><span>{e(case['category'])}</span><span>{e(case['status'])}</span></div><span class="arrow" aria-hidden="true">↗</span></a>'''

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
    research_summaries=''.join(research_summary(case,i+1) for i,case in enumerate(DATA['caseStudies']))
    experience=''.join(experience_row(item) for item in DATA['experience'])
    listed_publications=[pub for pub in DATA['publications'] if pub['status'].strip().casefold()!='in preparation']
    preparation_publications=[pub for pub in DATA['publications'] if pub['status'].strip().casefold()=='in preparation']
    publications=''.join(publication_row(pub) for pub in listed_publications)
    preparation=''
    if preparation_publications:
        preparation_rows=''.join(publication_row(pub) for pub in preparation_publications)
        preparation=f'''<section id="in-preparation" class="manuscripts-section" aria-labelledby="preparation-title"><h2 id="preparation-title" class="manuscripts-title">In preparation</h2><div class="preparation-list">{preparation_rows}</div></section>'''
    projects=''.join(project_row(project,i+1) for i,project in enumerate(DATA['projects']))
    selected_awards=[a for a in DATA['awards'] if any(t in a['title'] for t in ['KCC','KSC','WDSC','Army Commendation','Best KATUSA'])]
    awards=''.join(award_row(award) for award in selected_awards)
    patent=next(p for p in DATA['patents'] if p['status']=='Filed')
    text=head('Kyoungmin Roh — Cybersecurity, Machine Learning & Systems',DATA['summary'])
    text+=f'''<main id="main" class="wrap">
  <h1 id="top" class="sr-only">Kyoungmin Roh — Research portfolio</h1>
  <section id="about" class="section about-first" aria-labelledby="about-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">01 / ABOUT</p><h2 id="about-title" class="section-title">About</h2></div></div>
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
    <div class="experience-block"><div class="subsection-heading"><h3>Experience</h3><p>Research and military service</p></div><div class="timeline">{experience}</div></div>
    <div class="edu-line"><p class="eyebrow">EDUCATION</p><div><h3>{e(DATA['education']['organization'])}</h3><p>{e(DATA['education']['degree'])}<br>{e(DATA['education']['period'])}</p></div></div>
  </section>
  <section id="work" class="section research-overview" aria-labelledby="overview-title">
    <p class="eyebrow section-kicker">02 / RESEARCH</p>
    <div class="research-overview-intro"><div><h2 id="overview-title" class="section-title">Research overview</h2><p class="hero-role">Cybersecurity researcher</p></div><p class="hero-summary">I study Android malware detection under concept drift, post-quantum cryptography in trusted execution environments, and confidential computing for automotive systems.</p></div>
    <div class="interest-strip" aria-label="Research interests"><span>Concept drift</span><span>Machine learning for security</span><span>Trusted execution environments</span><span>Confidential computing</span></div>
    <div class="research-summary-list">{research_summaries}</div>
  </section>
  <section id="publications" class="section" aria-labelledby="publications-title">
    <div class="section-heading"><div><p class="eyebrow section-kicker">03 / PUBLICATIONS</p><h2 id="publications-title" class="section-title">Publications</h2></div><p>Journal articles and conference papers. Accepted work is marked.</p></div>
    <div class="publication-tools"><div class="filter-buttons" role="group" aria-label="Filter publications"><button type="button" class="filter-button" data-publication-filter="all" aria-pressed="true">All</button><button type="button" class="filter-button" data-publication-filter="international" aria-pressed="false">International</button><button type="button" class="filter-button" data-publication-filter="domestic" aria-pressed="false">Domestic &amp; other</button></div><span id="publication-count" class="mono muted" role="status" aria-live="polite">{len(listed_publications):02d} entries</span></div>
    <div class="publication-list">{publications}</div><p class="pub-status-note">Authors are listed in contribution order. † Co-first authors.</p>
  </section>
  {preparation}
  <section id="projects" class="section" aria-labelledby="projects-title"><div class="section-heading"><div><p class="eyebrow section-kicker">04 / PROJECTS &amp; TOOLS</p><h2 id="projects-title" class="section-title">Projects</h2></div><p>Security tools, AI applications, and research software.</p></div><div>{projects}</div><div class="project-links">{external('https://github.com/rohkyoungmin?tab=repositories','More on GitHub <span aria-hidden="true">↗</span>','text-link')}</div></section>
  <section id="recognition" class="section" aria-labelledby="recognition-title"><div class="recognition-grid"><div><p class="eyebrow section-kicker">05 / RECOGNITION</p><h2 id="recognition-title" class="section-title">Awards</h2><p class="about-note">Selected awards for research and military service.</p><div class="patent-block"><span class="eyebrow">PATENT APPLICATION / {patent['year']}</span><p>{e(patent['title'])}</p><p class="mono">{e(patent['reference'])}<br>{e(patent['status'])}</p></div></div><div>{awards}</div></div></section>
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
        blocks=''.join(f'<section class="case-section"><h2>{label}</h2><p>{e(case[key])}</p></section>' for label,key in [('Problem','problem'),('Approach','approach'),('Contribution','contribution'),('Results','outcome'),('Scope & limitations','limits')])
        resources=''.join(external(link['url'],e(link['label'])+' <span aria-hidden="true">↗</span>','pill-link') for link in case['links'])
        next_case=DATA['caseStudies'][(i+1)%len(DATA['caseStudies'])]
        text+=f'''<main id="main" class="wrap"><section id="top" class="case-hero"><a href="../index.html#work" class="back-link"><span aria-hidden="true">←</span> Selected research</a><h1 class="case-title">{e(case['title'])}</h1><p class="case-subtitle">{e(case['subtitle'])}</p><div class="case-meta">{meta}</div></section><figure class="case-art" style="margin:0"><img src="../assets/{slug}.svg" width="1600" height="1100" alt="Conceptual illustration for {e(case['title'])}"><figcaption class="art-caption">Conceptual illustration</figcaption></figure><div class="case-body">{blocks}<section class="case-section"><h2>Resources</h2><div class="case-resource-links">{resources}</div></section></div><section class="next-case"><a href="{next_case['id']}.html"><div><span class="eyebrow">NEXT PROJECT</span><h2>{e(next_case['title'])}</h2></div><span class="arrow" aria-hidden="true">↗</span></a></section></main>'''
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
