# Charles Gian Santos: Portfolio

My personal portfolio site. It's plain HTML, CSS, and JavaScript, with no frameworks and no build step.

## The idea

The site borrows its look from SnipURLnk: things get **snipped**.

- **Name snipper:** the "Snip my name" button cuts "Charles Gian Santos" down to "CGS" (the logo), the way a URL shortener would, and shows the before and after lengths. Click again to undo.
- **Cut lines:** sections are separated by dashed "cut here" lines that a pair of scissors runs along the first time you scroll past.
- **Paper and ink:** warm paper background, near-black ink, and one cut-red accent that only appears on the scissors and the "Email me" button.

The design reasons for each choice are written at the top of `styles.css`.

## Features

- Light and dark themes: follows your system setting, with a toggle that remembers your choice
- Respects `prefers-reduced-motion`: the snip and the scissors become instant, and nothing animates on its own
- Responsive from 375px phones up to desktop, keyboard accessible, and built with semantic HTML

## Files

```
index.html     page structure and content
styles.css     colors, layout, animations
main.js        interactions and animations
projects.js    YOUR PROJECTS: edit this to add, remove, or change cards
assets/        images, favicon
.nojekyll      tells GitHub Pages to serve files as-is
```

## Run it locally

Opening `index.html` directly works. A local server matches GitHub Pages more closely:

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Add a project

Copy one of the blocks in `projects.js`, edit it, and save. The **first** project gets the big featured slot, and the rest are listed below it, so order them by how proud you are of them. Put screenshots in `assets/`. Set `image`, `demo`, or `source` to `null` to leave it out.

## Things still to fill in

Search the project for `TODO`. Placeholders are also highlighted in orange on the page.

- [ ] Email address in the contact section (two places in `index.html`)
- [ ] LinkedIn URL
- [ ] `assets/resume.pdf`
- [ ] Your photo (replace `assets/photo-placeholder.svg`)
- [ ] Hero pitch line and the About bio
- [ ] Education entry in the timeline
- [ ] `assets/og-image.png` (1200×630) for link previews, then uncomment the `og:image` tag
- [ ] Live URL in `og:url` and in the "This portfolio" card once deployed

## Deploy to GitHub Pages

1. Create a GitHub repo. Name it `martinipolice.github.io` to get the root URL `https://martinipolice.github.io`, or use any name to get `https://martinipolice.github.io/<repo-name>`.
2. Push this folder's contents to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/martinipolice/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, then select `main` and `/ (root)`, and save.
4. The site goes live in a minute or two at the URL shown on that page.

Later changes go live with a simple `git push`.
