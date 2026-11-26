/* ============================================================
   FOREWRD STUDIO — shared navigation behaviour
   Loads data/products.json, fills the Category + Collection
   dropdowns, and powers the search box on every page.
   ============================================================ */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  }); }
  function catLabel(c) { return String(c || '').replace(/-/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); }); }

  var CATALOGUE = { categories: [], collections: [], pieces: [] };

  /* ---------------- hamburger + dropdowns ---------------- */
  function wireChrome() {
    var ham = $('fnavHam'), mob = $('fnavMobile');
    if (ham && mob) {
      ham.addEventListener('click', function () {
        var open = ham.classList.toggle('open');
        mob.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mob.addEventListener('click', function (e) {
        if (e.target.closest('a')) {   // a real link was tapped → close the menu
          ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = '';
        }
      });
    }
    // desktop dropdowns: hover is CSS; click toggles too (touch laptops)
    ['ddCat', 'ddColl'].forEach(function (id) {
      var el = $(id); if (!el) return;
      var trig = el.querySelector('.fnav__dd-trigger');
      if (trig) trig.addEventListener('click', function (e) { e.preventDefault(); el.classList.toggle('open'); });
    });
    // mobile dropdowns
    ['mddCat', 'mddColl'].forEach(function (id) {
      var el = $(id); if (!el) return;
      var trig = el.querySelector('.fnav__mdd-trigger');
      if (trig) trig.addEventListener('click', function () { el.classList.toggle('open'); });
    });
    // close desktop dropdowns on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.fnav__dd')) {
        var a = $('ddCat'), b = $('ddColl');
        if (a) a.classList.remove('open'); if (b) b.classList.remove('open');
      }
      if (!e.target.closest('.fnav__search')) closeSearch();
    });
  }

  /* ---------------- search ---------------- */
  var searchTimer = null;
  function wireSearch() {
    var box = $('fnavSearch'), btn = $('fnavSearchBtn'), input = $('fnavSearchInput');
    if (btn && box && input) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var opening = !box.classList.contains('open');
        box.classList.toggle('open', opening);
        if (opening) { input.focus(); } else { closeSearch(); }
      });
      input.addEventListener('input', function () { runSearch(input.value, 'fnavSearchResults'); });
    }
    var inputM = $('fnavSearchInputM');
    if (inputM) inputM.addEventListener('input', function () { runSearch(inputM.value, 'fnavSearchResultsM'); });
  }
  function closeSearch() {
    var box = $('fnavSearch'); if (box) box.classList.remove('open');
    ['fnavSearchResults', 'fnavSearchResultsM'].forEach(function (id) {
      var r = $(id); if (r) { r.classList.remove('show'); }
    });
  }
  function runSearch(q, resultsId) {
    var wrap = $(resultsId); if (!wrap) return;
    q = (q || '').trim().toLowerCase();
    if (!q) { wrap.classList.remove('show'); wrap.innerHTML = ''; return; }
    var hits = CATALOGUE.pieces.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) >= 0 || (p.category || '').toLowerCase().indexOf(q) >= 0;
    }).slice(0, 8);
    if (!hits.length) {
      wrap.innerHTML = '<div class="fnav__sr-empty">No pieces match “' + esc(q) + '”.</div>';
    } else {
      wrap.innerHTML = hits.map(function (p) {
        var img = p.img ? '<img class="fnav__sr-img" src="' + esc(p.img) + '" alt="" loading="lazy">' : '<span class="fnav__sr-img"></span>';
        return '<a class="fnav__sr" href="collection.html#piece=' + encodeURIComponent(p.id) + '">' +
          img + '<span class="fnav__sr-txt"><span class="fnav__sr-name">' + esc(p.name) + '</span>' +
          '<span class="fnav__sr-cat">' + esc(catLabel(p.category)) + '</span></span></a>';
      }).join('');
    }
    wrap.classList.add('show');
  }

  /* ---------------- populate dropdowns ---------------- */
  function fillMenus() {
    var catHtml = CATALOGUE.categories.length
      ? CATALOGUE.categories.map(function (c) { return '<a href="collection.html#category=' + encodeURIComponent(c) + '">' + esc(catLabel(c)) + '</a>'; }).join('')
      : '<span class="fnav__dd-empty">No categories</span>';
    var collHtml = CATALOGUE.collections.length
      ? CATALOGUE.collections.map(function (c) { return '<a href="collection.html#collection=' + encodeURIComponent(c.id) + '">' + esc(c.name) + '</a>'; }).join('')
      : '<span class="fnav__dd-empty">No collections yet</span>';
    [['ddCatMenu', catHtml], ['mddCatMenu', catHtml], ['ddCollMenu', collHtml], ['mddCollMenu', collHtml]].forEach(function (pair) {
      var el = $(pair[0]); if (el) el.innerHTML = pair[1];
    });
  }

  /* ---------------- load catalogue ---------------- */
  function load() {
    fetch('data/products.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        CATALOGUE.categories = data.categories || [];
        CATALOGUE.collections = (data.collections || []).filter(function (c) { return c.status !== 'draft'; });
        CATALOGUE.pieces = (data.products || [])
          .filter(function (p) { return !p.status || p.status === 'live'; })
          .map(function (p) {
            return { id: p.id, name: p.name, category: p.category,
              img: (p.images && p.images[0]) ? ('assets/products/' + p.folder + '/' + p.images[0]) : '' };
          });
        fillMenus();
      })
      .catch(function (err) { console.error('Nav: could not load catalogue', err); });
  }

  function markActive() {
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!page) page = 'index.html';
    var links = document.querySelectorAll('.fnav__links > li > a, .fnav__mobile > a');
    Array.prototype.forEach.call(links, function (a) {
      if ((a.getAttribute('href') || '').toLowerCase() === page) a.classList.add('active');
    });
  }

  function init() { wireChrome(); wireSearch(); markActive(); load(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
