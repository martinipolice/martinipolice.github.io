// Your projects, most important first. To add one, copy a block, edit it, and save.
// - The first project gets the big featured slot; the rest are listed below it.
// - image: a screenshot in assets/ (leave null for a text-only entry)
// - demo / source: full URLs, or null to hide that link
window.PROJECTS = [
  {
    title: "snipURlnk",
    summary: "Paste a long link, get a short one.",
    description:
      "A URL shortener with custom aliases, QR codes, optional GitHub login with a links dashboard, and Google Safe Browsing checks that refuse unsafe links. It rate-limits abuse and is covered by 161 pytest tests.",
    tech: ["Python", "Flask", "PostgreSQL", "pytest"],
    image: "assets/snipurlnk-dashboard.png",
    imageAlt: "snipURlnk's Your links dashboard, listing short links with click counts and Copy, QR code, and Remove buttons",
    demo: "https://snipurlnk.onrender.com",
    source: "https://github.com/martinipolice/snipurlnk",
    note: "Free hosting: the first visit can take about 30 s to wake the server.",
  },
  {
    title: "Martini's Brainrot Brawl",
    summary: "A 1v1 pixel-art fighting game you can play right now.",
    description:
      "Four fighters, six stages that react to the fight, and arcade, versus CPU, and 2-player modes. It runs in the browser on desktop and phones, every sound is synthesized live, and there is no build step.",
    tech: ["JavaScript", "Web Audio API"],
    image: "assets/brainrot-brawl.png",
    imageAlt: "Title screen of Martini's Brainrot Brawl, with four pixel-art fighters on a sunset beach",
    demo: "https://martinipolice.github.io/brainrot-brawl/",
    source: "https://github.com/martinipolice/brainrot-brawl",
  },
  {
    title: "Reincarnated as a Devourer",
    summary: "One life, 20 days to face the Demon King.",
    description:
      "A survivors-like I'm building in Godot, where you grow by devouring what you kill. It started as my terminal RPG for CMSC 12. Still in development: story and endings come next.",
    tech: ["Godot", "GDScript"],
    image: "assets/devourer.jpg",
    imageAlt: "Gameplay of Reincarnated as a Devourer, with a swarm of enemies closing in on the player in a forest",
    demo: null,
    source: "https://github.com/martinipolice/reincarnated-as-a-devourer",
  },
  {
    title: "Luzon Grid Dispatch",
    summary: "What should each power plant produce today, and what does that make electricity cost?",
    description:
      "My CMSC 150 project: it finds the cheapest way to run the Luzon grid for a day, then prices each block of the day from the shadow prices of the final simplex tableau. The simplex solver is written by hand, with no optimization libraries.",
    tech: ["R", "Shiny", "Linear programming"],
    image: "assets/luzon-grid.svg",
    imageAlt: "Bar chart sketch of power plant output across blocks of the day",
    demo: null,
    source: null, // private repo; add the URL if you make it public
    note: "In progress. The source is private for now.",
  },
];
