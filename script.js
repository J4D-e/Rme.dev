/* ================================================================
   PORTAFOLIO — script.js
   1. Intro overlay: se desvanece y revela la página
   2. Navbar: fondo al scroll + link activo
   3. Menú hamburguesa
   4. Reveal con IntersectionObserver (incluye barras de lenguaje)
   5. Rotación de tech-pills en el hero
   6. Año dinámico en footer
   7. Smooth scroll
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────────────────
     1. AÑO DINÁMICO
  ────────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ──────────────────────────────────────────────────────────────
     2. INTRO OVERLAY
     Espera 2s → dispara la animación de salida → lo oculta
  ────────────────────────────────────────────────────────────── */
  const intro = document.getElementById('intro');

  if (intro) {
    setTimeout(() => {
      // Añadimos la clase que ejecuta el keyframe de salida
      intro.classList.add('intro--out');

      // Tras la animación (700ms) lo removemos del flujo
      setTimeout(() => {
        intro.style.display = 'none';
      }, 700);
    }, 2000); // 2 segundos de "Bienvenido"
  }


  /* ──────────────────────────────────────────────────────────────
     3. NAVBAR — fondo + link activo
  ────────────────────────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function onScroll() {
    // Fondo traslúcido
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Link activo según sección visible
    let currentId = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) currentId = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  // Throttle con rAF
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  });
  onScroll(); // Estado inicial


  /* ──────────────────────────────────────────────────────────────
     4. MENÚ HAMBURGUESA
  ────────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navLinks');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.innerHTML = open
        ? '<i class="ph ph-x"></i>'
        : '<i class="ph ph-list"></i>';
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar al hacer clic en un link
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.innerHTML = '<i class="ph ph-list"></i>';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ──────────────────────────────────────────────────────────────
     5. REVEAL CON INTERSECTIONOBSERVER
     También activa las barras de progreso de lenguajes
     cuando la bento-card entra en pantalla.
  ────────────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Observar bento-cards por separado para las barras de lenguaje
  const bentoObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          bentoObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.bento-card').forEach(el => bentoObserver.observe(el));


  /* ──────────────────────────────────────────────────────────────
     6. ROTACIÓN DE TECH-PILLS EN EL HERO
     Cicla el estado .active entre las pills cada 1.8s
  ────────────────────────────────────────────────────────────── */
  const pills = document.querySelectorAll('.tech-pill');

  if (pills.length > 0) {
    let current = 0;

    setInterval(() => {
      // Quitar activo del actual
      pills[current].classList.remove('active');

      // Avanzar
      current = (current + 1) % pills.length;

      // Activar el siguiente
      pills[current].classList.add('active');
    }, 1800);
  }


  /* ──────────────────────────────────────────────────────────────
     7. SMOOTH SCROLL para links internos
  ────────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); // fin DOMContentLoaded
