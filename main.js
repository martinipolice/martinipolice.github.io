(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  const toggle = $(".theme-toggle");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  const labelToggle = () => toggle.setAttribute("aria-label", `Switch to ${isDark() ? "light" : "dark"} theme`);
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelToggle();
  });
  labelToggle();

  /* ---------- Tickets ---------- */
  const PROJECTS = window.PROJECTS || [];
  const links = (p) => [
    p.play && `<button type="button" data-play="${esc(p.demo)}">Play here</button>`,
    p.demo && `<a href="${esc(p.demo)}" target="_blank" rel="noopener">${p.play ? "Open full screen" : "Try it"}<span class="sr-only">: ${esc(p.title)}, opens in a new tab</span></a>`,
    p.source && `<a href="${esc(p.source)}" target="_blank" rel="noopener">Source<span class="sr-only"> for ${esc(p.title)}, opens in a new tab</span></a>`,
  ].filter(Boolean).join("");

  const media = (p) => (p.grid
    ? `<div class="scratch" data-label="SCRATCH TO REVEAL"><div class="grid" id="grid"></div></div>`
    : `<div class="scratch" data-label="SCRATCH TO REVEAL"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy" decoding="async"></div>`);

  $("#tickets").innerHTML = PROJECTS.map((p, i) => `
    <article class="ticket ticket--${esc(p.size)}" id="ticket-${i + 1}" data-react="${esc(p.react)}">
      <div class="ticket__media">${media(p)}</div>
      <div class="ticket__body">
        <p class="ticket__stub"><span>No. ${String(i + 1).padStart(2, "0")}</span><span class="ticket__status">${esc(p.status)}</span></p>
        <h3 class="ticket__title">${esc(p.title)}</h3>
        <p class="ticket__itch">${esc(p.itch)}</p>
        <p class="ticket__desc">${esc(p.description)}</p>
        <p class="ticket__mono"><span class="sr-only">Built with: </span>${p.tech.map(esc).join(" · ")}</p>
        ${p.repo ? `<p class="ticket__mono" data-repo="${esc(p.repo)}"></p>` : ""}
        ${p.note ? `<p class="ticket__mono">${esc(p.note)}</p>` : ""}
        <div class="ticket__links">${links(p)}</div>
      </div>
    </article>`).join("");

  /* ---------- Play Brainrot Brawl inside its ticket ---------- */
  $$("[data-play]").forEach((btn) => btn.addEventListener("click", () => {
    const ticket = btn.closest(".ticket");
    const box = $(".ticket__media", ticket);
    let frame = $("iframe", box);
    if (frame) { frame.remove(); btn.textContent = "Play here"; return; }
    revealAll(ticket);
    frame = document.createElement("iframe");
    frame.src = btn.dataset.play;
    frame.title = `${$(".ticket__title", ticket).textContent}, playable game`;
    box.append(frame);
    frame.focus();
    btn.textContent = "Close game";
  }));

  /* ---------- Reactions ---------- */
  const react = (ticket) => {
    if (reduceMotion) return;
    ticket.classList.remove("reacting");
    void ticket.offsetWidth; // restart the animation
    ticket.classList.add("reacting");
    setTimeout(() => ticket.classList.remove("reacting"), 900);
  };

  /* ---------- Scratch foil ---------- */
  const scratches = $$(".scratch");

  const paintFoil = (ctx, w, h, label) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    ["#9aa1ab", "#dfe3e8", "#a9afb8", "#eef0f3", "#969da8"].forEach((c, i) => g.addColorStop(i / 4, c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-0.2);
    ctx.fillStyle = "rgba(22,19,13,.2)";
    ctx.textAlign = "center";
    const size = Math.max(13, Math.min(w, h) * 0.04);
    ctx.font = `${size}px "Bowlby One", Impact, sans-serif`;
    for (let row = -9; row <= 9; row++) {
      for (let col = -3; col <= 3; col++) {
        ctx.fillText(label, col * size * 15 + (row % 2) * size * 7.5, row * size * 3);
      }
    }
    ctx.restore();
  };

  const makeFoil = (box) => {
    const ticket = box.closest(".ticket");
    const canvas = document.createElement("canvas");
    canvas.className = "foil";
    canvas.setAttribute("aria-hidden", "true");
    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "foil-skip";
    skip.textContent = "Reveal";
    skip.setAttribute("aria-label", `Reveal ${$(".ticket__title", ticket).textContent}`);
    box.append(canvas, skip);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    let done = false, last = null, strokes = 0, brush = 30;

    const size = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 1.25); // foil is soft, so keep the canvas light
      const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (done || (w === canvas.width && h === canvas.height)) return; // phone toolbars must not reset a scratch
      canvas.width = w;
      canvas.height = h;
      ctx.globalCompositeOperation = "source-over";
      paintFoil(ctx, canvas.width, canvas.height, box.dataset.label);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      brush = Math.max(30, r.width * 0.09) * dpr;
      ctx.lineWidth = brush;
    };

    const finish = () => {
      if (done) return;
      done = true;
      canvas.classList.add("is-gone");
      skip.remove();
      setTimeout(() => canvas.remove(), 400);
      react(ticket);
    };
    box._reveal = finish;

    const cleared = () => {
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) { total++; if (data[i] === 0) clear++; }
      return clear / total;
    };

    const line = (x0, y0, x1, y1) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      if (++strokes % 10 === 0 && cleared() > 0.42) finish();
    };

    const point = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    };

    // Mouse scratches on hover. Touch scratches on drag, and scrolling stays free.
    canvas.addEventListener("pointermove", (e) => {
      const p = point(e);
      if (last) line(last.x, last.y, p.x, p.y);
      last = p;
    });
    canvas.addEventListener("pointerleave", () => { last = null; });
    canvas.addEventListener("pointercancel", () => { last = null; });
    skip.addEventListener("click", finish);
    box.addEventListener("focusin", (e) => { if (e.target !== skip) finish(); }); // never leave keyboard focus under the foil

    // Touch screens get a scratch that plays itself when the ticket scrolls into view.
    if (coarse) {
      new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting || done) return;
        obs.disconnect();
        let t = 0;
        const steps = 22;
        const sweep = () => {
          if (done || t > steps) { finish(); return; }
          const x = (t / steps) * canvas.width;
          const a = t % 2 ? canvas.height : 0;
          line(x - brush, canvas.height - a, x, a);
          t++;
          requestAnimationFrame(sweep);
        };
        sweep();
      }, { threshold: 0.7 }).observe(box);
    }

    size();
    new ResizeObserver(size).observe(box);
    if (document.fonts) document.fonts.ready.then(size);
  };

  const revealAll = (ticket) => $$(".scratch", ticket).forEach((b) => b._reveal && b._reveal());

  if (!reduceMotion) {
    scratches.forEach(makeFoil);
  }

  /* ---------- Luzon mini dispatch (figures from the CMSC 150 project data) ---------- */
  const grid = $("#grid");
  if (grid) {
    const blocks = ["12am", "4am", "8am", "12pm", "4pm", "8pm"];
    const demand = [6300, 8600, 11800, 12300, 14000, 10600];
    const plants = [
      { name: "Solar", color: "#ffc42e", mw: 2500, avail: [0, 0.1, 0.6, 0.55, 0.08, 0], cost: [40, 40, 40, 40, 40, 40] },
      { name: "Wind", color: "#8fd3c8", mw: 400, avail: [0.35, 0.3, 0.25, 0.25, 0.3, 0.35], cost: [60, 60, 60, 60, 60, 60] },
      { name: "Hydro", color: "#6fa8dc", mw: 2500, cost: [300, 300, 300, 300, 300, 300] },
      { name: "Geothermal", color: "#e8a07a", mw: 800, cost: [1500, 1515, 1545, 1575, 1560, 1530] },
      { name: "Coal", color: "#b9b3a6", mw: 7000, cost: [3800, 3838, 3914, 3990, 3952, 3876] },
      { name: "Gas", color: "#f08a5d", mw: 3300, cost: [6500, 6565, 6695, 6825, 6760, 6630] },
      { name: "Oil", color: "#ff6a4a", mw: 1500, cost: [14000, 14140, 14420, 14700, 14560, 14280] },
    ];
    // shortcut: cheapest-first only, the real project solves the full LP with simplex
    const dispatch = (b) => {
      let left = demand[b], price = 0;
      const used = [];
      for (const p of [...plants].sort((x, y) => x.cost[b] - y.cost[b])) {
        const mw = Math.min(left, p.mw * (p.avail ? p.avail[b] : 1));
        if (mw <= 0) continue;
        used.push({ ...p, used: mw });
        left -= mw;
        price = p.cost[b];
        if (!left) break;
      }
      return { used, price };
    };
    console.assert(dispatch(0).price === 3800 && dispatch(4).price === 14560, "dispatch merit order");

    grid.innerHTML = `
      <div class="grid__head"><span id="grid-when"></span><span class="grid__price" id="grid-price"></span></div>
      <div class="grid__stack" id="grid-stack"></div>
      <div class="grid__legend" id="grid-legend"></div>
      <label>Time of day<input id="grid-slider" type="range" min="0" max="5" step="1" value="4"></label>`;
    const slider = $("#grid-slider");
    const stack = $("#grid-stack");
    stack.innerHTML = plants.map((p, i) => `<div class="grid__bar" data-i="${i}" style="background:${p.color};flex:0 0 0%"></div>`).join("");
    const draw = () => {
      const b = +slider.value;
      const { used, price } = dispatch(b);
      $("#grid-when").textContent = `${blocks[b]}: ${demand[b].toLocaleString()} MW demand`;
      $("#grid-price").textContent = `₱${price.toLocaleString()}/MWh`;
      slider.setAttribute("aria-valuetext", `${blocks[b]}, ${demand[b]} megawatts`);
      $$(".grid__bar", stack).forEach((el) => {
        const u = used.find((x) => x.name === plants[+el.dataset.i].name);
        el.style.flexBasis = `${u ? (u.used / demand[b]) * 100 : 0}%`;
      });
      $("#grid-legend").innerHTML = used.map((u) => `<span><i style="background:${u.color}"></i>${u.name}</span>`).join("");
    };
    slider.addEventListener("input", draw);
    draw();
  }

  /* ---------- Live GitHub data: hidden quietly if the API can't be reached ---------- */
  const ago = (iso) => {
    const days = Math.floor((Date.now() - new Date(iso)) / 864e5);
    return days <= 0 ? "today" : days === 1 ? "yesterday" : days < 60 ? `${days} days ago` : `${Math.round(days / 30)} months ago`;
  };
  const showRepos = (repos) => {
    const byName = Object.fromEntries(repos.map((r) => [r.name, r]));
    $$("[data-repo]").forEach((el) => {
      const r = byName[el.dataset.repo];
      if (!r) return;
      el.textContent = `Last pushed ${ago(r.pushed_at)}${r.stargazers_count ? ` · ${r.stargazers_count} ★` : ""}`;
    });
    const latest = PROJECTS.filter((p) => byName[p.repo]).sort((a, b) => new Date(byName[b.repo].pushed_at) - new Date(byName[a.repo].pushed_at))[0];
    if (latest) {
      const live = $(".hero__live");
      live.innerHTML = `Latest on my public GitHub: <a href="${esc(latest.source)}">${esc(latest.title)}</a>, pushed ${ago(byName[latest.repo].pushed_at)}`;
    }
  };
  (async () => {
    try {
      let repos = JSON.parse(sessionStorage.getItem("repos") || "null");
      if (!repos) {
        const res = await fetch("https://api.github.com/users/martinipolice/repos?per_page=100&sort=pushed");
        if (!res.ok) return;
        repos = await res.json();
        sessionStorage.setItem("repos", JSON.stringify(repos.map(({ name, pushed_at, stargazers_count }) => ({ name, pushed_at, stargazers_count }))));
      }
      showRepos(repos);
    } catch (e) { /* the static page is complete without it */ }
  })();

  /* ---------- Contribution graph: public data via a free API, since GitHub's own needs a token ---------- */
  // Third-party data goes into innerHTML, so nothing passes through unless it has the exact expected shape.
  const cleanDays = (list) => list
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date))
    .map((d) => ({ date: d.date, count: Math.max(0, Number(d.count) || 0), level: Math.min(4, Math.max(0, Math.trunc(Number(d.level)) || 0)) }));
  const drawContrib = ({ total, contributions }) => {
    const days = cleanDays(contributions);
    const CELL = 12, TOP = 18;
    const offset = new Date(`${days[0].date}T00:00Z`).getUTCDay();
    let cells = "", months = "", lastMonth = -1;
    days.forEach((d, i) => {
      const slot = i + offset, week = Math.floor(slot / 7), day = slot % 7, date = new Date(`${d.date}T00:00Z`);
      cells += `<rect x="${week * CELL}" y="${TOP + day * CELL}" width="10" height="10" rx="2" class="l${d.level}"><title>${d.count} on ${d.date}</title></rect>`;
      if (day === 0 && date.getUTCMonth() !== lastMonth && week < 51) {
        lastMonth = date.getUTCMonth();
        months += `<text x="${week * CELL}" y="11">${date.toLocaleString("en", { month: "short", timeZone: "UTC" })}</text>`;
      }
    });
    const weeks = Math.ceil((days.length + offset) / 7);
    $("#contrib").innerHTML = `<svg viewBox="0 0 ${weeks * CELL} ${TOP + 7 * CELL}" role="img" aria-label="Daily GitHub contributions over the last year">${months}${cells}</svg>`;
    if (Number.isFinite(total)) $("#contrib-title").textContent = `${total.toLocaleString()} contributions in the last year`;
  };
  (async () => {
    try {
      let data = JSON.parse(sessionStorage.getItem("contrib") || "null");
      if (!data) {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/martinipolice?y=last");
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        data = { total: json.total.lastYear, contributions: json.contributions };
        sessionStorage.setItem("contrib", JSON.stringify(data));
      }
      drawContrib(data);
    } catch (e) {
      $("#contrib").remove(); // the heading and GitHub link still stand on their own
      $(".contrib__key").remove();
    }
  })();

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
