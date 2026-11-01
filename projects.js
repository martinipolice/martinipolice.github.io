// Each project is a scratch-off ticket, shown in this order. To add one, copy a block and edit it.
// - itch: the thought that started it
// - size: "wide" takes a full row, "half" pairs with the next half
// - react: what the ticket does once revealed: flash, hit, snip, bite, route, power
// - repo: public GitHub repo name, used to show live stats (null if private)
// - demo / source: full URLs, or null to hide that link. Only link what visitors can open.
// - play: true adds a "Play here" button that loads the demo inside the ticket
// - grid: true shows the live dispatch demo instead of an image
window.PROJECTS = [
  {
    title: "Sameframe",
    itch: "Why do photobooths only work if everyone's in the same room?",
    description:
      "Two to six friends open one link from different places, pose to the same prompts on a shared countdown, and each get one photo strip with everyone in every frame. Video goes straight between browsers.",
    tech: ["SvelteKit", "TypeScript", "Cloudflare", "WebRTC"],
    status: "Live, early",
    size: "wide",
    react: "flash",
    image: "assets/sameframe.jpg",
    imageAlt: "Sameframe's home page: a photobooth for people who aren't in the same room, with a blank photo strip taped to the side",
    demo: "https://sameframe.sameframe-app.workers.dev",
    repo: null,
    source: null,
    note: "Private repo. Still being tested with real people.",
  },
  {
    title: "Martini's Brainrot Brawl",
    itch: "What if I clashed Gen Z brainrot with my love for fighting games?",
    description:
      "A 1v1 pixel-art fighting game in the browser. Four fighters, six stages that react to the fight, and arcade, versus CPU, and 2-player modes. Every sound is synthesized live, and there is no build step.",
    tech: ["JavaScript", "Web Audio API"],
    status: "Live",
    size: "wide",
    react: "hit",
    image: "assets/brainrot-brawl.png",
    imageAlt: "Title screen of Martini's Brainrot Brawl, with four pixel-art fighters on a sunset beach",
    demo: "https://martinipolice.github.io/brainrot-brawl/",
    play: true,
    repo: "brainrot-brawl",
    source: "https://github.com/martinipolice/brainrot-brawl",
  },
  {
    title: "snipURlnk",
    itch: "How hard can a URL shortener really be?",
    description:
      "Harder than it looks. Custom aliases, QR codes, GitHub login with a links dashboard, Google Safe Browsing checks that refuse unsafe links, rate limits, and 161 pytest tests.",
    tech: ["Python", "Flask", "PostgreSQL", "pytest"],
    status: "Live",
    size: "half",
    react: "snip",
    image: "assets/snipurlnk-dashboard.png",
    imageAlt: "snipURlnk's Your links dashboard, listing short links with click counts and Copy, QR code, and Remove buttons",
    demo: "https://snipurlnk.onrender.com",
    repo: "snipurlnk",
    source: "https://github.com/martinipolice/snipurlnk",
    note: "Free hosting: the first visit can take about 30 s to wake up.",
  },
  {
    title: "Reincarnated as a Devourer",
    itch: "What if my terminal RPG for CMSC 12 became a real game?",
    description:
      "A survivors-like in Godot. You get one life and 20 days to face the Demon King, growing stronger by devouring what you kill. Story and endings come next.",
    tech: ["Godot", "GDScript"],
    status: "In development",
    size: "half",
    react: "bite",
    image: "assets/devourer.jpg",
    imageAlt: "Gameplay of Reincarnated as a Devourer, with a swarm of enemies closing in on the player in a forest",
    demo: null,
    repo: "reincarnated-as-a-devourer",
    source: "https://github.com/martinipolice/reincarnated-as-a-devourer",
  },
  {
    title: "TranSync",
    itch: "What would it take to bring a dead transit app back online?",
    description:
      "A public-transport tracker and passenger-hailing app. The original site went offline, so I rebuilt it on Node.js and SQLite with the same features, then added ride cancelling, request expiry, and demo buses that drive themselves.",
    tech: ["Node.js", "SQLite", "Leaflet"],
    status: "Live",
    size: "half",
    react: "route",
    image: "assets/transync.jpg",
    imageAlt: "TranSync's live map, showing a bus route through Makati and BGC",
    demo: "https://transync-b4hl.onrender.com/",
    repo: null,
    source: null,
    note: "Private repo. Free hosting: the first visit can take a moment.",
  },
  {
    title: "Luzon Grid Dispatch",
    itch: "What should each power plant produce today, and what does that make electricity cost?",
    description:
      "My CMSC 150 project finds the cheapest way to run the Luzon grid for a day, with a simplex solver written by hand in R. The slider shows a simplified version: plants fill demand, cheapest first.",
    tech: ["R", "Shiny", "Linear programming"],
    status: "In progress",
    size: "half",
    react: "power",
    grid: true,
    demo: null,
    repo: null,
    source: null,
    note: "Private repo. The real model also handles coal limits, ramping, hydro water, and CO2 caps.",
  },
];
