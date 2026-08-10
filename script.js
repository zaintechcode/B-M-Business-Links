/* =====================================================================
   B & M BUSINESS LINKS FZE LLC — MASTER SCRIPT
   =====================================================================
   Sections:
   1. Lucide icon render
   2. Sticky nav background on scroll
   3. Mobile drawer menu
   4. Scroll-reveal fade-up animations
   5. FAQ accordion (only runs if .faq-item exists on the page)
   6. Animated number counters (only runs if [data-counter] exists)
   7. Contact form submit handler (demo only — see comment)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------
     1. Render Lucide icons (safe no-op if the library didn't load)
  --------------------------------------------------------------- */
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }

  /* ---------------------------------------------------------------
     2. Sticky nav — adds "scrolled" class after 60px of scroll
  --------------------------------------------------------------- */
  var nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ---------------------------------------------------------------
     3. Mobile drawer menu (hamburger icon)
  --------------------------------------------------------------- */
  var burger = document.getElementById('burgerBtn');
  var drawer = document.getElementById('mobileDrawer');
  var closeDrawer = document.getElementById('closeDrawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () { drawer.classList.add('open'); });
    if (closeDrawer) closeDrawer.addEventListener('click', function () { drawer.classList.remove('open'); });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { drawer.classList.remove('open'); });
    });
  }

  /* ---------------------------------------------------------------
     4. Scroll reveal — add class="reveal" to any element in the HTML
        and it will fade + slide up the first time it enters view.
  --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     5. FAQ accordion — expects markup:
        <div class="faq-item">
          <button class="faq-q">Question <span class="plus">+</span></button>
          <div class="faq-a"><p>Answer</p></div>
        </div>
  --------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    if (item.classList.contains('open')) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var ia = i.querySelector('.faq-a');
        if (ia) ia.style.maxHeight = null;
      });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------------------------------------------------------------
     6. Animated number counters — expects:
        <span data-counter data-target="3500" data-suffix="+">0</span>
  --------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1600;
        var start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------------------------------------------------------------
     7. Contact form — DEMO ONLY.
        This just prevents the page from reloading and shows a
        confirmation message. Replace this with a real submit
        (e.g. fetch() to your backend, or a Formspree/Netlify Forms
        action attribute on the <form> tag) before going live.
  --------------------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Message Sent — Thank You';
      contactForm.reset();
      setTimeout(function () { btn.textContent = original; }, 3200);
    });
  }

});
