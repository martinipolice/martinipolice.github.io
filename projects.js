// Your projects, most important first. To add one, copy a block, edit it, and save.
// - The first project gets the big featured slot; the rest are listed below it.
// - image: a screenshot in assets/ (leave null for a text-only entry)
// - demo / source: full URLs, or null to hide that link
window.PROJECTS = [
  {
    title: "SnipURLnk",
    summary: "Paste a long link, get a short one.",
    description:
      "A URL shortener with custom aliases, QR codes, and Google Safe Browsing checks that refuse unsafe links. It rate-limits abuse, has a report and removal flow for bad links, and is covered by 104 pytest tests.",
    tech: ["Python", "Flask", "PostgreSQL", "pytest"],
    image: "assets/snipurlnk-qr.png",
    imageAlt: "SnipURLnk's QR code popup for a shortened link, with download, share, and copy buttons",
    demo: "https://snipurlnk.onrender.com",
    source: "https://github.com/martinipolice/snipurlnk",
    note: "Free hosting: the first visit can take about 30 s to wake the server.",
  },
  {
    title: "Luzon Grid Dispatch",
    summary: "What should each power plant produce today, and what does that make electricity cost?",
    description:
      "A CMSC 150 project that finds the cheapest way to run the Luzon grid for a day, then prices each block of the day from the shadow prices of the final simplex tableau. The simplex solver is written by hand, no optimization libraries.",
    tech: ["R", "Shiny", "Linear programming"],
    image: "assets/luzon-grid.svg",
    imageAlt: "Bar chart sketch of power plant output across blocks of the day",
    demo: null, // TODO: add a link if you deploy it (e.g. shinyapps.io)
    source: "https://github.com/martinipolice/luzon-grid-dispatch",
  },
  {
    title: "This site",
    summary: "You're on it.",
    description:
      "Plain HTML, CSS, and JavaScript. The name snipper in the header is a nod to SnipURLnk.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: null,
    demo: null, // you're already on it
    source: "https://github.com/martinipolice/martinipolice.github.io",
  },
];
