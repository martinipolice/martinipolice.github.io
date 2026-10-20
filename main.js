(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  const toggle = $(".theme-toggle");
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const labelToggle = () => toggle.setAttribute("aria-label", `Switch to ${isDark() ? "light" : "dark"} theme`);
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelToggle();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", labelToggle);
  labelToggle();

  /* ---------- Projects ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const links = (p) => {
    const out = [];
    // The demo link shows its real address: for a URL shortener, the URL is the product.
    if (p.demo) out.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener"><span class="url">${esc(host(p.demo))}</span><span class="sr-only"> (live demo of ${esc(p.title)}, opens in a new tab)</span></a>`);
    if (p.source) out.push(`<a href="${esc(p.source)}" target="_blank" rel="noopener">Source<span class="sr-only"> code for ${esc(p.title)} on GitHub, opens in a new tab</span></a>`);
    return out.length ? `<div class="links">${out.join("")}</div>` : "";
  };
  const shot = (p) => (p.image ? `<div class="shot"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || "")}" loading="lazy"></div>` : "");
  const tech = (p) => `<p class="mono-list"><span class="sr-only">Built with: </span>${p.tech.map(esc).join(" · ")}</p>`;

  const [first, ...rest] = window.PROJECTS || [];
  let html = "";
  if (first) {
    html += `
      <article class="feature reveal">
        ${shot(first)}
        <div>
          <h3 class="feature__title">${esc(first.title)}</h3>
          <p class="feature__summary">${esc(first.summary)}</p>
          <p class="desc">${esc(first.description)}</p>
          ${tech(first)}
          ${first.note ? `<p class="note">${esc(first.note)}</p>` : ""}
          ${links(first)}
        </div>
      </article>`;
  }
  if (rest.length) {
    html += `<ul class="rows">${rest.map((p) => `
      <li class="row ${p.image ? "" : "row--text"} reveal">
        <div>
          <h3 class="row__title">${esc(p.title)}</h3>
          <p class="row__summary">${esc(p.summary)}</p>
        </div>
        <div>
          <p class="desc">${esc(p.description)}</p>
          ${tech(p)}
          ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
          ${links(p)}
        </div>
        ${shot(p)}
      </li>`).join("")}</ul>`;
  }
  $("#projects").innerHTML = html;

  /* ---------- Name snipper ---------- */
  // Splits the name into letters. The first letter of each word stays; the rest get cut.
  const name = $(".snip");
  const full = name.textContent.trim();
  const short = full.split(/\s+/).map((w) => w[0]).join("").toLowerCase();
  const fullSlug = full.replace(/\s+/g, "").toLowerCase();
  name.setAttribute("aria-label", full);
  let cutIndex = 0;
  name.innerHTML = `<span aria-hidden="true">${full.split(/\s+/).map((word, wi) =>
    (wi ? `<span class="gap"></span>` : "") +
    `<span class="word">${[...word].map((ch, ci) => {
      if (ci === 0) return `<span class="ch">${esc(ch)}</span>`;
      const i = cutIndex++;
      return `<span class="ch drop" style="--r:${(i % 2 ? -1 : 1) * (6 + (i * 7) % 14)}deg" data-i="${i}">${esc(ch)}</span>`;
    }).join("")}</span>`).join("")}</span>`;

  // Letters collapse by max-width, so each one needs its own width (in em, so resizing is free).
  const measure = () => {
    const fs = parseFloat(getComputedStyle(name).fontSize);
    $$(".ch", name).forEach((c) => {
      c.style.setProperty("--w", "none");
      c.style.setProperty("--w", `${(c.getBoundingClientRect().width / fs + 0.02).toFixed(3)}em`);
    });
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(measure);

  const btn = $(".snip__btn");
  const label = $(".snip__label");
  const out = $(".snip__out");
  const cuts = $$(".ch.drop", name);
  const gaps = $$(".gap", name);

  btn.addEventListener("click", () => {
    const snipping = !name.classList.contains("is-snipped");
    // Snip: letters drop one after another, then close up. Unsnip: space opens first, then letters return.
    cuts.forEach((c) => {
      const i = +c.dataset.i;
      c.style.setProperty("--d", snipping ? `${0.08 + i * 0.025}s` : `${0.2 + i * 0.02}s`);
      c.style.setProperty("--dw", snipping ? `${0.3 + i * 0.012}s` : "0s");
    });
    gaps.forEach((g) => g.style.setProperty("--dw", snipping ? "0.45s" : "0s"));

    if (snipping && !reduceMotion.matches) {
      name.classList.remove("is-cutting");
      void name.offsetWidth; // restart the sweep
      name.classList.add("is-cutting");
      btn.classList.add("is-snipping");
      setTimeout(() => { name.classList.remove("is-cutting"); btn.classList.remove("is-snipping"); }, 700);
    }
    name.classList.toggle("is-snipped", snipping);
    btn.setAttribute("aria-pressed", String(snipping));
    label.textContent = snipping ? "Unsnip" : "Snip my name";
    out.innerHTML = snipping
      ? `<b>${fullSlug}</b> → <b>${short}</b>, ${fullSlug.length} → ${short.length} characters`
      : "Back to full length.";
  });

  /* ---------- Scroll reveals and cut lines ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.classList.contains("cut")) setTimeout(() => e.target.classList.add("is-done"), 1150);
      io.unobserve(e.target);
    }),
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
  );
  $$(".reveal, .cut").forEach((el) => io.observe(el));

  /* ---------- Nav state ---------- */
  const nav = $(".nav");
  const navLinks = $$(".nav__links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    nav.classList.toggle("is-scrolled", scrollY > 8);
    let current = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    navLinks.forEach((a, i) => {
      a.classList.toggle("is-active", i === current);
      if (i === current) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Copy email ---------- */
  const copyBtn = $(".copy-btn");
  const copyStatus = $(".copy-status");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      copyBtn.textContent = "Copied";
      copyStatus.textContent = "Email address copied.";
    } catch (e) {
      copyStatus.textContent = "Couldn't copy. Select the address instead.";
    }
    setTimeout(() => { copyBtn.textContent = "Copy"; copyStatus.textContent = ""; }, 2200);
  });
})();
