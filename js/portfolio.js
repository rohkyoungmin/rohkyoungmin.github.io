(() => {
  'use strict';
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
  const gallery = document.getElementById('gallery-track');
  if (gallery) {
    const controls = [...document.querySelectorAll('[data-gallery-direction]')];
    const updateGalleryControls = () => {
      const end = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      controls.forEach(button => {
        button.disabled = Number(button.dataset.galleryDirection) < 0
          ? gallery.scrollLeft <= 2
          : gallery.scrollLeft >= end - 2;
      });
    };
    controls.forEach(button => button.addEventListener('click', () => {
      const card = gallery.querySelector('.research-card');
      const gap = parseFloat(window.getComputedStyle(gallery).columnGap) || 0;
      const distance = card ? card.getBoundingClientRect().width + gap : gallery.clientWidth;
      gallery.scrollBy({
        left: Number(button.dataset.galleryDirection) * distance,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }));
    gallery.addEventListener('scroll', updateGalleryControls, { passive: true });
    window.addEventListener('resize', updateGalleryControls);
    updateGalleryControls();
  }
  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publications = [...document.querySelectorAll('.publication-list .publication')];
  const count = document.getElementById('publication-count');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.publicationFilter;
    filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    let visible = 0;
    publications.forEach(publication => {
      const show = selected === 'all' || publication.dataset.category === selected;
      publication.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `${String(visible).padStart(2, '0')} entries`;
  }));
})();
