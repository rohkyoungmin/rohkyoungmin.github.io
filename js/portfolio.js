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
    let current = 0;
    let opener = null;
    let savedOverflow = '';

    const showPhoto = index => {
      current = (index + photos.length) % photos.length;
      const photo = photos[current];
      const image = photo.querySelector('img');
      viewerImage.src = photo.href;
      viewerImage.alt = image.alt;
      viewerTitle.textContent = photo.dataset.photoAlbum;
      caption.textContent = photo.dataset.photoCaption;
      position.textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    };
    photos.forEach((photo, index) => photo.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = photo;
      showPhoto(index);
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
