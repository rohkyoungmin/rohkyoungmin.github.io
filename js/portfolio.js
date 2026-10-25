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

  // Book pages are fixed-height columns. Extra content continues across the next spread.
  const bookRoutes = [
    {href:'/index.html',label:'About'},{href:'/education.html',label:'Education'},
    {href:'/experience.html',label:'Experience'},{href:'/publications.html',label:'Publications'},
    {href:'/patents.html',label:'Patents'},{href:'/projects.html',label:'Projects'},
    {href:'/research/cca.html',label:'CCA'},{href:'/research/mlkem.html',label:'ML-KEM'},
    {href:'/research/scan.html',label:'SCAN'},{href:'/research/alarm.html',label:'ALARM'},
    {href:'/awards.html',label:'Awards'},{href:'/certificate.html',label:'Certificate'},
    {href:'/extracurricular.html',label:'Extracurricular'},{href:'/participation.html',label:'Gallery'}
  ];
  let bookMain = null;
  let refreshBookNavigation = () => {};
  const main = document.querySelector('main.wrap');
  const routeKey = location.pathname.replace(/^\/+/, '') || 'index.html';
  const routeIndex = bookRoutes.findIndex(route => route.href.replace(/^\/+/, '') === routeKey);
  if (main && routeIndex !== -1 && !main.classList.contains('not-found')) {
    bookMain = main;
    const previous = bookRoutes[routeIndex - 1] || null;
    const next = bookRoutes[routeIndex + 1] || null;
    const isHome = routeKey === 'index.html';
    main.classList.add('book-spread', 'book-spread--' + (isHome ? 'home' : routeKey.replace(/\.html$/, '')));
    if (routeKey.startsWith('research/')) main.classList.add('book-spread--case');
    main.dataset.bookPrev = previous ? previous.href : '';
    main.dataset.bookNext = next ? next.href : '';

    const navigation = document.createElement('div');
    navigation.className = 'book-navigation wrap';
    const folio = document.createElement('div');
    folio.className = 'book-folio';
    folio.setAttribute('aria-hidden', 'true');
    const leftNumber = document.createElement('span');
    const rightNumber = document.createElement('span');
    folio.append(leftNumber, rightNumber);
    const controls = document.createElement('nav');
    controls.className = 'book-turn-controls';
    controls.setAttribute('aria-label', 'Turn book pages');
    const status = document.createElement('p');
    status.className = 'book-page-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    const makeTurn = side => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'book-turn-link book-turn-' + side;
      button.dataset.bookTurn = side;
      const arrow = document.createElement('span');
      arrow.className = 'book-turn-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = side === 'prev' ? '←' : '→';
      const label = document.createElement('span');
      label.className = 'book-turn-label';
      if (side === 'prev') button.append(arrow, label);
      else button.append(label, arrow);
      return button;
    };
    const previousButton = makeTurn('prev');
    const nextButton = makeTurn('next');
    controls.append(previousButton, status, nextButton);
    navigation.append(folio, controls);
    main.after(navigation);
    main.setAttribute('aria-label', 'Two-page book spread. Click a page or use the arrows to turn.');

    const getPageState = () => {
      const style = getComputedStyle(main);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const padRight = parseFloat(style.paddingRight) || 0;
      const width = Math.max(1, main.clientWidth - padLeft - padRight);
      // Multicol layouts add one gutter between each facing spread as well as between pages.
      const gap = parseFloat(style.columnGap) || 0;
      const step = width + gap;
      const totalWidth = Math.max(width, main.scrollWidth - padLeft - padRight);
      const total = Math.max(1, Math.ceil((totalWidth + gap - 1) / step));
      const current = Math.max(0, Math.min(total - 1, Math.round(main.scrollLeft / step)));
      const perSpread = Math.max(1, parseInt(style.getPropertyValue('--book-visible-pages'), 10) || 2);
      return {width, step, total, current, perSpread};
    };
    const pageRange = (spread, perSpread) => {
      const first = spread * perSpread + 1;
      return {first, last:first + perSpread - 1};
    };
    const displayRange = range => String(range.first).padStart(2, '0') + '–' + String(range.last).padStart(2, '0');

    refreshBookNavigation = () => {
      const state = getPageState();
      const totalPages = state.total * state.perSpread;
      const current = pageRange(state.current, state.perSpread);
      leftNumber.textContent = String(current.first).padStart(2, '0');
      rightNumber.textContent = String(current.last).padStart(2, '0');
      status.textContent = state.perSpread === 1
        ? 'PAGE ' + String(current.first).padStart(2, '0') + ' / ' + String(totalPages).padStart(2, '0')
        : 'PAGES ' + displayRange(current) + ' / ' + String(totalPages).padStart(2, '0');
      const prevInternal = state.current > 0;
      const nextInternal = state.current < state.total - 1;
      const prevText = prevInternal
        ? 'PREVIOUS · ' + displayRange(pageRange(state.current - 1, state.perSpread))
        : previous ? 'PREVIOUS · ' + previous.label : 'PREVIOUS';
      const nextText = nextInternal
        ? 'NEXT · ' + displayRange(pageRange(state.current + 1, state.perSpread))
        : next ? 'NEXT · ' + next.label : 'NEXT';
      previousButton.querySelector('.book-turn-label').textContent = prevText;
      nextButton.querySelector('.book-turn-label').textContent = nextText;
      previousButton.setAttribute('aria-label', prevText);
      nextButton.setAttribute('aria-label', nextText);
      previousButton.disabled = !prevInternal && !previous;
      nextButton.disabled = !nextInternal && !next;
      main.dataset.bookSpreadIndex = String(state.current);
      main.dataset.bookSpreadCount = String(state.total);
      main.style.setProperty('--spread-scroll-offset', Math.round(main.scrollLeft) + 'px');
      main.setAttribute('aria-label', (state.perSpread === 1 ? 'One-page book view. ' : 'Two-page book spread. ')
        + 'Showing ' + status.textContent.toLowerCase() + '. Click a page or use the arrows to turn.');
    };

    let isTurning = false;
    const turnTo = (destination, direction) => {
      if (isTurning) return;
      isTurning = true;
      let leaf = null;
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        if (leaf && leaf.parentNode) leaf.remove();
        main.classList.remove('book-is-turning-next', 'book-is-turning-prev');
        isTurning = false;
        if (destination.href) {
          window.location.assign(destination.href);
          return;
        }
        const state = getPageState();
        main.scrollLeft = Math.max(0, Math.min(state.total - 1, destination.spread)) * state.step;
        refreshBookNavigation();
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
        return;
      }
      const bounds = main.getBoundingClientRect();
      leaf = main.cloneNode(true);
      leaf.removeAttribute('id');
      leaf.classList.add('book-flip-layer');
      leaf.dataset.turn = direction;
      leaf.setAttribute('aria-hidden', 'true');
      leaf.setAttribute('role', 'presentation');
      leaf.inert = true;
      leaf.style.top = bounds.top + 'px';
      leaf.style.left = bounds.left + 'px';
      leaf.style.width = bounds.width + 'px';
      leaf.style.height = bounds.height + 'px';
      leaf.style.zIndex = '25';
      leaf.style.overflow = 'hidden';
      leaf.scrollLeft = main.scrollLeft;
      leaf.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      leaf.querySelectorAll('dialog, [role="dialog"]').forEach(element => element.remove());
      main.classList.add('book-is-turning-' + direction);
      document.body.append(leaf);
      leaf.addEventListener('animationend', event => {
        if (event.target === leaf && event.animationName.indexOf('portfolio-leaf-') === 0) finish();
      }, {once:true});
      window.setTimeout(finish, 430);
    };

    const turnPage = direction => {
      const state = getPageState();
      if (direction === 'next') {
        if (state.current < state.total - 1) turnTo({spread:state.current + 1}, 'next');
        else if (next) turnTo({href:next.href}, 'next');
      } else {
        if (state.current > 0) turnTo({spread:state.current - 1}, 'prev');
        else if (previous) turnTo({href:previous.href}, 'prev');
      }
    };
    previousButton.addEventListener('click', () => turnPage('prev'));
    nextButton.addEventListener('click', () => turnPage('next'));

    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const link = target && target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin || destination.pathname === location.pathname) return;
      const key = destination.pathname.replace(/^\/+/, '') || 'index.html';
      const index = bookRoutes.findIndex(route => route.href.replace(/^\/+/, '') === key);
      if (index === -1 || index === routeIndex) return;
      event.preventDefault();
      turnTo({href:destination.href}, index > routeIndex ? 'next' : 'prev');
    }, true);

    main.addEventListener('click', event => {
      if (event.button !== 0 || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target || target.closest('a,button,input,select,textarea,summary,dialog,[role="dialog"],[contenteditable="true"]')) return;
      if (window.getSelection && window.getSelection().toString()) return;
      const bounds = main.getBoundingClientRect();
      turnPage(event.clientX < bounds.left + bounds.width / 2 ? 'prev' : 'next');
    });

    let refreshFrame = 0;
    const scheduleRefresh = () => {
      if (refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        refreshBookNavigation();
      });
    };
    main.addEventListener('scroll', scheduleRefresh, {passive:true});
    window.addEventListener('resize', scheduleRefresh);
    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      if (document.querySelector('dialog[open]')) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target && target.closest('input,textarea,select,[contenteditable="true"]')) return;
      event.preventDefault();
      turnPage(event.key === 'ArrowLeft' ? 'prev' : 'next');
    });
    window.requestAnimationFrame(refreshBookNavigation);
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
    if (bookMain) { bookMain.scrollLeft = 0; window.requestAnimationFrame(refreshBookNavigation); }
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
