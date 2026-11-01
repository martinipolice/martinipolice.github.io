# Charles Gian Santos: Portfolio

My personal portfolio site. It's plain HTML, CSS, and JavaScript, with no frameworks and no build step.

## The idea

I build things to scratch an itch, so every project here is a **scratch-off ticket**.

- **Scratch foil:** move a mouse over the foil to scratch it. On touch screens the scratch plays itself when the ticket scrolls into view. Every foil also has a Reveal button.
- **Live background:** slowly drifting print dots that use only transform, so they stay smooth on slow devices.
- **One reaction per project:** a camera flash, a hit spark, a snip, a bite, a passing bus, or the grid powering on.
- **Real, working pieces:** Brainrot Brawl is playable inside its ticket, and the Luzon ticket has a small cheapest-first dispatch demo that uses the project's real figures.
- **Live data:** last push dates and stars come from the GitHub API, and the contribution graph comes from github-contributions-api.jogruber.de. If either fails, that data stays hidden and the page is still complete.

The design reasons for each choice are written at the top of `styles.css`.

## Features

- Light and dark themes: follows your system setting, with a toggle that remembers your choice
- Respects `prefers-reduced-motion`: there is no foil and nothing animates
- Responsive from 375px phones up to desktop, keyboard accessible, and built with semantic HTML

## Files

```
index.html     page structure and content
styles.css     colors, layout, animations
main.js        interactions and animations
theme.js       applies the saved theme before first paint
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

Copy one of the blocks in `projects.js`, edit it, and save. The comment at the top of that file explains each field. Tickets appear in file order. Put screenshots in `assets/`. Only link what visitors can open: leave `source` as `null` for private repos.

The résumé link points to LinkedIn on purpose: the PDF has a phone number on it.

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
