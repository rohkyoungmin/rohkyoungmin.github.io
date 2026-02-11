(function () {
  'use strict';

  var THEME_KEY = 'portfolio-theme';

  // 테마: 저장된 값 또는 시스템 선호도, 없으면 다크
  function getPreferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    setTheme(getPreferredTheme());
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  initTheme();

  // 모바일 메뉴
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 스크롤 시 섹션 등장
  var sections = document.querySelectorAll('.section');

  function checkVisible() {
    var windowHeight = window.innerHeight;
    var revealPoint = 120;

    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top < windowHeight - revealPoint) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisible);
  window.addEventListener('load', checkVisible);
  checkVisible();

  // 헤더 스크롤 시 배경 강조 (CSS 변수 사용)
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
})();
