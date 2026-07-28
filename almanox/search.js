(function () {
  var INDEX_URL = "/almanox/search-index.json";
  var idx = null, loading = false;

  var css = document.createElement("style");
  css.textContent =
    ".site-search{position:relative;display:flex;align-items:center;list-style:none}" +
    ".site-search input{width:150px;max-width:44vw;background:rgba(176,198,232,.06);border:1px solid var(--line-strong,rgba(176,198,232,.2));color:var(--star,#eef2f8);border-radius:999px;padding:7px 13px;font:inherit;font-size:.9rem;outline:none;transition:width .18s,border-color .18s}" +
    ".site-search input:focus{width:212px;border-color:var(--brass,#e6a552)}" +
    ".site-search input::placeholder{color:var(--faint,#607089)}" +
    ".ss-panel{position:absolute;top:calc(100% + 10px);right:0;width:min(360px,86vw);background:var(--ink-2,#0b1322);border:1px solid var(--line-strong,rgba(176,198,232,.2));border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.6);padding:6px;z-index:200;max-height:min(70vh,460px);overflow:auto;display:none}" +
    ".ss-panel.open{display:block}" +
    ".ss-panel a{display:block;padding:10px 12px;border-radius:10px;color:var(--star,#eef2f8);text-decoration:none}" +
    ".ss-panel a:hover,.ss-panel a.ss-active{background:var(--brass-soft,rgba(230,165,82,.12))}" +
    ".ss-panel a b{color:var(--brass,#e6a552);font-weight:600;display:block;font-size:.95rem}" +
    ".ss-panel a span{color:var(--muted,#8fa0b8);font-size:.82rem;display:block;margin-top:2px;line-height:1.35}" +
    ".ss-empty{padding:14px 12px;color:var(--faint,#607089);font-size:.88rem}";
  document.head.appendChild(css);

  function decode(s) {
    var t = document.createElement("textarea");
    t.innerHTML = s;
    return t.value;
  }

  function load(cb) {
    if (idx) return cb(idx);
    if (loading) return;
    loading = true;
    fetch(INDEX_URL).then(function (r) { return r.json(); }).then(function (d) {
      idx = d; loading = false; cb(idx);
    }).catch(function () { loading = false; });
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return idx.map(function (p) {
      var hay = (p.t + " " + p.k + " " + p.u).toLowerCase();
      var score = 0, ok = true;
      terms.forEach(function (t) {
        var i = hay.indexOf(t);
        if (i < 0) { ok = false; return; }
        score += (p.t.toLowerCase().indexOf(t) >= 0 ? 5 : 1);
      });
      return ok ? { p: p, s: score } : null;
    }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 8).map(function (x) { return x.p; });
  }

  function build() {
    var host = document.querySelector("nav .nav-links") || document.querySelector("nav");
    if (!host) return;
    var box = document.createElement("li");
    box.className = "site-search";
    var input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search the guide...";
    input.setAttribute("aria-label", "Search the Almanox guide");
    var panel = document.createElement("div");
    panel.className = "ss-panel";
    box.appendChild(input);
    box.appendChild(panel);
    host.appendChild(box);

    var active = -1, results = [];
    function render() {
      var q = input.value.trim();
      if (!q) { panel.classList.remove("open"); panel.innerHTML = ""; return; }
      results = search(q);
      active = -1;
      if (!results.length) {
        panel.innerHTML = '<div class="ss-empty">No matches for &ldquo;' + q.replace(/</g, "&lt;") + '&rdquo;</div>';
      } else {
        panel.innerHTML = results.map(function (p) {
          return '<a href="' + p.u + '"><b>' + decode(p.t) + "</b><span>" + decode(p.d) + "</span></a>";
        }).join("");
      }
      panel.classList.add("open");
    }
    input.addEventListener("input", function () { load(render); });
    input.addEventListener("focus", function () { if (input.value.trim()) load(render); });
    input.addEventListener("keydown", function (e) {
      var links = panel.querySelectorAll("a");
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, links.length - 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); }
      else if (e.key === "Enter") { if (active >= 0 && links[active]) { window.location = links[active].getAttribute("href"); } return; }
      else if (e.key === "Escape") { panel.classList.remove("open"); input.blur(); return; }
      links.forEach(function (l, i) { l.classList.toggle("ss-active", i === active); });
    });
    document.addEventListener("click", function (e) { if (!box.contains(e.target)) panel.classList.remove("open"); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
