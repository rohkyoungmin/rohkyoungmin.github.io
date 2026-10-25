(() => {
  'use strict';
  // Preserve bookmarks from the former single-page portfolio.
  const legacyRoutes = {
    experience: 'experience.html',
    education: 'education.html',
    publications: 'publications.html',
    patents: 'patents.html',
    projects: 'projects.html',
    recognition: 'awards.html',
    scholarships: 'awards.html',
    gallery: 'participation.html',
    participation: 'participation.html'
  };
  const hash = location.hash.slice(1);
  if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) {
    const route = hash.startsWith('project-') ? 'projects.html' : legacyRoutes[hash];
    if (route) {
      const targetHash = hash === 'gallery' ? '#participation' : location.hash;
      location.replace(route + location.search + targetHash);
      return;
    }
  }
  const menu = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  if (menu && links) {
    const closeMenu = () => { links.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu +'; };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      links.classList.toggle('is-open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close −' : 'Menu +';
    });
    links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
    document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
  }

  // Present every portfolio route as a two-page spread. Clicking either half
  // turns to the adjacent spread; links and controls keep their own behavior.
  const bookRoutes = [
    {href: '/index.html', label: 'About'},
    {href: '/education.html', label: 'Education'},
    {href: '/experience.html', label: 'Experience'},
    {href: '/publications.html', label: 'Publications'},
    {href: '/patents.html', label: 'Patents'},
    {href: '/projects.html', label: 'Projects'},
    {href: '/research/cca.html', label: 'CCA'},
    {href: '/research/mlkem.html', label: 'ML-KEM'},
    {href: '/research/scan.html', label: 'SCAN'},
    {href: '/research/alarm.html', label: 'ALARM'},
    {href: '/awards.html', label: 'Awards'},
    {href: '/certificate.html', label: 'Certificate'},
    {href: '/extracurricular.html', label: 'Extracurricular'},
    {href: '/participation.html', label: 'Gallery'}
  ];
  const main = document.querySelector('main.wrap');
  const routeKey = location.pathname.replace(/^\/+/, '') || 'index.html';
  const routeIndex = bookRoutes.findIndex(route => route.href.replace(/^\/+/, '') === routeKey);
  if (main && routeIndex !== -1 && !main.classList.contains('not-found')) {
    let isTurning = false;
    const turnTo = (href, direction) => {
      if (isTurning) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.assign(href);
        return;
      }
      isTurning = true;
      const bounds = main.getBoundingClientRect();
      const leaf = main.cloneNode(true);
      leaf.removeAttribute('id');
      leaf.classList.add('book-flip-layer');
      leaf.dataset.turn = direction;
      leaf.setAttribute('aria-hidden', 'true');
      leaf.setAttribute('role', 'presentation');
      leaf.inert = true;
      leaf.style.top = `${bounds.top}px`;
      leaf.style.left = `${bounds.left}px`;
      leaf.style.width = `${bounds.width}px`;
      leaf.style.height = `${bounds.height}px`;
      leaf.style.zIndex = '25';
      leaf.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      leaf.querySelectorAll('dialog, [role="dialog"], .book-turn-controls').forEach(element => element.remove());
      main.classList.add(`book-is-turning-${direction}`);
      document.body.append(leaf);
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.location.assign(href);
      };
      leaf.addEventListener('animationend', event => {
        if (event.target === leaf && event.animationName.startsWith('portfolio-leaf-')) finish();
      }, {once: true});
      window.setTimeout(finish, 740);
    };
    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const link = target && target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin || destination.pathname === location.pathname) return;
      const destinationKey = destination.pathname.replace(/^\/+/, '') || 'index.html';
      const destinationIndex = bookRoutes.findIndex(route => route.href.replace(/^\/+/, '') === destinationKey);
      if (destinationIndex === -1 || destinationIndex === routeIndex) return;
      event.preventDefault();
      turnTo(destination.href, destinationIndex > routeIndex ? 'next' : 'prev');
    }, true);

    const previous = bookRoutes[routeIndex - 1];
    const next = bookRoutes[routeIndex + 1];
    main.classList.add('book-spread');
    if (routeKey.startsWith('research/')) main.classList.add('book-spread--case');
    else main.classList.add(`book-spread--${routeKey.replace(/\.html$/, '')}`);
    main.dataset.bookPrev = previous ? previous.href : '';
    main.dataset.bookNext = next ? next.href : '';
    main.setAttribute('aria-label', 'Two-page book spread. Click the left or right page to turn.');

    const folio = document.createElement('div');
    folio.className = 'book-folio';
    folio.setAttribute('aria-hidden', 'true');
    const leftNumber = String(routeIndex * 2 + 1).padStart(2, '0');
    const rightNumber = String(routeIndex * 2 + 2).padStart(2, '0');
    folio.innerHTML = `<span>${leftNumber}</span><span>${rightNumber}</span>`;

    const turns = document.createElement('nav');
    turns.className = 'book-turn-controls';
    turns.setAttribute('aria-label', 'Turn book pages');
    const makeTurn = (route, side, direction, ordinal) => {
      const link = document.createElement(route ? 'a' : 'span');
      link.className = `book-turn-link book-turn-${side}`;
      if (route) {
        link.href = route.href;
        link.setAttribute('aria-label', `${direction} to ${route.label}`);
      } else {
        link.setAttribute('aria-disabled', 'true');
      }
      const arrow = document.createElement('span');
      arrow.className = 'book-turn-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = side === 'prev' ? '←' : '→';
      const label = document.createElement('span');
      label.className = 'book-turn-label';
      label.textContent = route ? `${direction} · ${route.label}` : direction;
      if (side === 'prev') link.append(arrow, label);
      else link.append(label, arrow);
      return link;
    };
    turns.append(makeTurn(previous, 'prev', 'PREVIOUS', leftNumber), makeTurn(next, 'next', 'NEXT', rightNumber));
    if (!main.classList.contains('home-spread')) main.append(folio);
    main.append(turns);

    main.addEventListener('click', event => {
      if (event.button !== 0 || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target || target.closest('a,button,input,select,textarea,summary,dialog,[role="dialog"],[contenteditable="true"]')) return;
      if (window.getSelection && window.getSelection().toString()) return;
      const bounds = main.getBoundingClientRect();
      const destinationIndex = event.clientX < bounds.left + bounds.width / 2 ? routeIndex - 1 : routeIndex + 1;
      const destination = bookRoutes[destinationIndex];
      if (destination) {
        turnTo(destination.href, destinationIndex > routeIndex ? 'next' : 'prev');
      }
    });

    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      if (document.querySelector('dialog[open]')) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target && target.closest('input,textarea,select,[contenteditable="true"]')) return;
      const destination = event.key === 'ArrowLeft' ? previous : next;
      if (!destination) return;
      event.preventDefault();
      turnTo(destination.href, event.key === 'ArrowLeft' ? 'prev' : 'next');
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publications = [...document.querySelectorAll('.publication-list .publication')];
  const count = document.getElementById('publication-count');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.publicationFilter;
    filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    let visible = 0;
    publications.forEach(publication => {
      const unpublished = publication.dataset.publicationStatus === 'unpublished';
      const show = selected === 'all' || (selected === 'unpublished'
        ? unpublished
        : !unpublished && publication.dataset.category === selected);
      publication.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `${String(visible).padStart(2, '0')} entries`;
  }));

  // Photo links stay usable without JavaScript; enhance them with a modal viewer.
  const viewer = document.getElementById('photo-viewer');
  const photos = [...document.querySelectorAll('.photo-open')];
  if (viewer && photos.length && typeof viewer.showModal === 'function') {
    const viewerImage = viewer.querySelector('.photo-viewer-image');
    const viewerTitle = viewer.querySelector('#photo-viewer-title');
    const caption = viewer.querySelector('.photo-viewer-caption');
    const position = viewer.querySelector('.photo-position');
    const close = viewer.querySelector('.photo-close');
    const previous = viewer.querySelector('.photo-prev');
    const next = viewer.querySelector('.photo-next');
    let activePhotos = [];
    let current = 0;
    let opener = null;
    let savedOverflow = '';

    const showPhoto = index => {
      if (!activePhotos.length) return;
      current = (index + activePhotos.length) % activePhotos.length;
      const photo = activePhotos[current];
      const image = photo.querySelector('img');
      viewerImage.src = photo.href;
      viewerImage.alt = image.alt;
      viewerTitle.textContent = photo.dataset.photoAlbum;
      caption.textContent = photo.dataset.photoCaption;
      position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(activePhotos.length).padStart(2, '0')}`;
    };
    photos.forEach(photo => photo.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = photo;
      activePhotos = photos.filter(item => item.dataset.photoAlbum === photo.dataset.photoAlbum);
      showPhoto(activePhotos.indexOf(photo));
      savedOverflow = document.body.style.overflow;
      viewer.showModal();
      document.body.style.overflow = 'hidden';
    }));
    close.addEventListener('click', () => viewer.close());
    previous.addEventListener('click', () => showPhoto(current - 1));
    next.addEventListener('click', () => showPhoto(current + 1));
    viewer.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    viewer.addEventListener('click', event => {
      if (event.target !== viewer) return;
      const bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    });
    viewer.addEventListener('close', () => {
      document.body.style.overflow = savedOverflow;
      if (opener) opener.focus({preventScroll: true});
    });
  }
})();
