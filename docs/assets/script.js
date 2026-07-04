/* Theme toggle with persistence + smooth TOC active state */
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("os-theme");
  if (saved) root.setAttribute("data-theme", saved);

  window.toggleTheme = function () {
    const cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("os-theme", next);
    updateIcon();
  };

  function updateIcon() {
    const btn = document.getElementById("themeBtn");
    if (!btn) return;
    const dark = root.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀️" : "🌙";
    btn.setAttribute("aria-label", dark ? "מצב בהיר" : "מצב כהה");
  }

  document.addEventListener("DOMContentLoaded", updateIcon);

  /* Highlight active TOC entry on scroll */
  document.addEventListener("DOMContentLoaded", function () {
    const links = Array.from(document.querySelectorAll(".toc a"));
    if (!links.length) return;
    const map = links.map(a => ({ a, el: document.querySelector(a.getAttribute("href")) }))
                     .filter(x => x.el);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          map.forEach(m => m.a.style.color = "");
          const hit = map.find(m => m.el === e.target);
          if (hit) hit.a.style.color = "var(--primary)";
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    map.forEach(m => obs.observe(m.el));
  });
})();
