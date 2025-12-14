# A.Belousov Design — Portfolio

<p align="center">
  <img src="assets/img/AB_Logo_Black.png" alt="A.B.Design Logo" width="120">
</p>

Modern one-page portfolio with case study subpages for A.Belousov Design. The site mixes a 3D hero, kinetic project conveyor, and detailed project pages to keep visitors exploring.

## Highlights
- Hero mosaic with interactive 3D `model-viewer` marks and portrait frames.
- Infinite project conveyor, quick jumps to all cases, and a “Random” project trigger.
- Featured banners and full project grid with hover glassmorphism accents.
- Project pages with coverflow gallery, ABOUT/PERSONAS, styleguide, tools, and prev/next mini-previews.
- Mono-style metrics board to surface shipped brands, years in design, merch units, and stream views.
- Smooth parallax background and soft fade-in animations across sections.

## Project Structure
- `index.html` — landing page, hero + featured + all projects + metrics board.
- `projects/` — individual case pages (Bonch Tigers, Stream Studio, Enhavor, etc.) sharing the same header/footer.
- `assets/css/` — base, layout, components, home, and project styles.
- `assets/js/script.js` — conveyor duplication, random project action, parallax background, coverflow logic, and prev/next project injection.
- `assets/models/` — GLB files for the 3D studio mark.
- `assets/img/` — logos, portraits, icons, and project thumbs/banners.

## Run Locally
1) Clone the repo: `git clone https://github.com/rifined/rifined.github.io.git`
2) Open `index.html` in your browser.  
   (No build step needed; everything is plain HTML/CSS/JS. Model-viewer is pulled from CDN.)

## Deploy
The repo is set up for GitHub Pages. Push to `main` to publish at `https://rifined.github.io/`.

## Credits
Design & code: A.Belousov Design.  
3D: studio mark GLB assets in `assets/models/`.  
Typography: Truin + IBM Plex Mono.
