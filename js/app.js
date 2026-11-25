(function () {
  "use strict";
  var S = window.SITE || {}, D = window.SUBMISSIONS || [], T = window.SUBMISSION_TYPES || [];
  var UI = S.ui || {}, page = document.body.dataset.page;
  var P = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var I = {
    arrow: P + '<path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: P + '<path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    search: P + '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    grid: P + '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
    research: P + '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/></svg>',
    essay: P + '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/></svg>',
    presentation: P + '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    poster: P + '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/></svg>',
    info: P + '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    menu: P + '<path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: P + '<path d="M6 6l12 12M18 6L6 18"/></svg>',
    download: P + '<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
    shield: P + '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    sprout: P + '<path d="M12 21v-9M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2-5 6-5 0 3-2 5-6 5z"/></svg>',
    users: P + '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.5 0 4 1.5 4.5 4.5"/></svg>',
    compass: P + '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
    user: P + '<circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.7-6 8-6s7.3 2 8 6"/></svg>',
    plus: P + '<path d="M12 5v14M5 12h14"/></svg>'
  };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var get = function (path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S); };
  var typeOf = function (id) { return T.filter(function (t) { return t.id === id; })[0] || {}; };

  if (S.showPlaceholders !== false) document.body.classList.add("ph");

  /* ---------- shared header / footer ---------- */
  function link(href, key, pg) { return '<a href="' + href + '"' + (page === pg || (page === "submission" && pg === "submissions") ? ' class="is-active" aria-current="page"' : "") + '><span data-key="' + key + '"></span></a>'; }
  var logo = S.logo ? '<img src="' + esc(S.logo) + '" alt="">' : "";
  document.getElementById("site-header").outerHTML =
    '<header class="site-header"><div class="wrap header__in">' +
    '<a class="brand" href="index.html"><span class="brand__logo">' + logo + '</span><span class="brand__name" data-key="name"></span></a>' +
    '<button class="burger" id="burger" aria-expanded="false" aria-controls="nav" aria-label="' + esc(UI.menu) + '"><i class="ico">' + I.menu + '</i></button>' +
    '<nav class="nav" id="nav">' + link("index.html", "nav.home", "home") + link("submissions.html", "nav.submissions", "submissions") + '</nav></div></header>';
  document.getElementById("site-footer").outerHTML =
    '<footer class="site-footer"><div class="wrap footer__grid">' +
    '<div><a class="brand" href="index.html"><span class="brand__logo">' + logo + '</span><span class="brand__name" data-key="name"></span></a><p class="footer__about" data-key="footer.about"></p></div>' +
    '<nav class="footer__nav">' + link("index.html", "nav.home", "home") + link("submissions.html", "nav.submissions", "submissions") + '</nav>' +
    '<div class="footer__contact"><h3 data-key="footer.contactTitle"></h3><p data-key="footer.contact.0"></p><p data-key="footer.contact.1"></p><p data-key="footer.contact.2"></p></div>' +
    '</div><div class="wrap footer__bottom"><p data-key="footer.bottom"></p></div></footer>';
  var burger = document.getElementById("burger"), nav = document.getElementById("nav");
  burger.addEventListener("click", function () {
    var o = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", o); burger.firstChild.innerHTML = o ? I.close : I.menu;
  });
  var hdr = document.querySelector(".site-header");
  addEventListener("scroll", function () { hdr.classList.toggle("is-scrolled", scrollY > 8); }, { passive: true });

  function fill(root) {
    root.querySelectorAll("[data-key]").forEach(function (el) { var v = get(el.dataset.key); el.textContent = typeof v === "string" ? v : ""; });
    root.querySelectorAll("[data-ico]").forEach(function (el) { el.innerHTML = I[el.dataset.ico] || ""; });
  }
  var base = S.name || "";

  /* ---------- cards ---------- */
  function badge(tp, solid) {
    return '<span class="badge' + (solid ? " badge--solid" : "") + '"><i class="ico">' + (I[tp.icon] || "") + '</i>' + (tp.label ? '<span>' + esc(tp.label) + '</span>' : "") + '</span>';
  }
  function card(it) {
    var tp = typeOf(it.type);
    return '<a class="card" href="submission.html?id=' + encodeURIComponent(it.id) + '">' +
      '<div class="card__cover">' + (it.cover ? '<img loading="lazy" src="' + esc(it.cover) + '" alt="">' : '<div class="card__fallback"><i class="ico">' + (I[tp.icon] || I.research) + '</i></div>') + badge(tp) + '</div>' +
      '<div class="card__body"><h3>' + esc(it.title) + '</h3>' +
      '<p class="card__by"><i class="ico">' + I.user + '</i><span>' + esc(it.student) + (it["class"] ? " · " + esc(it["class"]) : "") + '</span></p>' +
      '<span class="btn btn--sm">' + (UI.open ? '<span>' + esc(UI.open) + '</span>' : "") + '<i class="ico">' + I.arrow + '</i></span></div></a>';
  }
  var ghost = '<div class="card card--ghost" aria-hidden="true"><div class="card__cover"><i class="ico">' + I.plus + '</i></div><div class="card__body"><i class="sk"></i><i class="sk sk--s"></i></div></div>';

  /* ---------- pages ---------- */
  if (page === "home") {
    document.title = base || (S.nav && S.nav.home) || "";
    document.getElementById("cta-types").innerHTML = T.map(function (t) { return '<span class="pill"><i class="ico">' + I[t.icon] + '</i></span>'; }).join("");
  }

  if (page === "submissions") {
    document.title = base || (S.nav && S.nav.submissions) || "";
    var grid = document.getElementById("grid"), q = document.getElementById("q"), chips = document.getElementById("chips");
    var state = { q: "", type: "all" };
    q.placeholder = UI.searchPlaceholder || ""; q.setAttribute("aria-label", UI.searchPlaceholder || "search");
    var defs = [{ id: "all", icon: "grid", label: UI.all }].concat(T);
    chips.innerHTML = defs.map(function (t) { return '<button type="button" class="chip" data-type="' + esc(t.id) + '" aria-pressed="' + (t.id === "all") + '"><i class="ico">' + I[t.icon] + '</i>' + (t.label ? '<span>' + esc(t.label) + '</span>' : "") + '</button>'; }).join("");
    var render = function () {
      if (!D.length) { grid.innerHTML = ghost + ghost + ghost; return; }
      var s = state.q.trim().toLowerCase();
      var list = D.filter(function (it) {
        if (state.type !== "all" && it.type !== state.type) return false;
        return !s || [it.title, it.student, it["class"], it.summary, (it.tags || []).join(" ")].join(" ").toLowerCase().indexOf(s) > -1;
      });
      grid.innerHTML = list.length ? list.map(card).join("") : '<div class="empty"><i class="ico">' + I.search + '</i><p>' + esc((S.submissions || {}).noResults) + '</p></div>';
    };
    q.addEventListener("input", function () { state.q = q.value; render(); });
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return; state.type = b.dataset.type;
      chips.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      render();
    });
    render();
  }

  if (page === "submission") {
    var id = new URLSearchParams(location.search).get("id"), it = D.filter(function (x) { return x.id === id; })[0], box = document.getElementById("article");
    var back = '<a class="btn btn--ghost" href="submissions.html"><i class="ico">' + I.back + '</i>' + (UI.back ? '<span>' + esc(UI.back) + '</span>' : "") + '</a>';
    if (!it) {
      document.title = base;
      box.innerHTML = '<div class="article">' + back + '<div class="empty"><i class="ico">' + I.search + '</i><p>' + esc(UI.notFound) + '</p></div></div>';
    } else {
      document.title = it.title || base;
      var meta = [it.student, it["class"], it.date].filter(Boolean).map(function (m) { return '<span>' + esc(m) + '</span>'; }).join("");
      box.innerHTML = '<article class="article">' + back +
        '<header class="article__head">' + badge(typeOf(it.type), true) +
        '<h1>' + esc(it.title) + '</h1>' + (meta ? '<p class="article__meta">' + meta + '</p>' : "") + '</header>' +
        (it.cover ? '<img class="article__cover" src="' + esc(it.cover) + '" alt="">' : "") +
        (it.content ? '<div class="prose">' + it.content + '</div>' : "") +
        (it.embed ? '<div class="embed"><iframe src="' + esc(it.embed) + '" loading="lazy" allowfullscreen title=""></iframe></div>' : "") +
        ((it.files || []).length ? '<div class="files">' + it.files.map(function (f) { return '<a class="btn btn--primary" href="' + esc(f.url) + '" target="_blank" rel="noopener"><i class="ico">' + I.download + '</i>' + (f.label ? '<span>' + esc(f.label) + '</span>' : "") + '</a>'; }).join("") + '</div>' : "") +
        '</article>';
    }
  }
  fill(document);
})();
