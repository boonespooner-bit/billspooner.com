# billspooner.com

The official website for Bill Spooner — guitarist, songwriter, and founding
member of The Tubes.

## Structure

```
/                     Home
/about/               About Bill Spooner
  /about/photos.html  Photo gallery
  /about/music.html   Bill's songwriting credits
/tubes/               The Tubes
  /tubes/photos.html  Band photos
  /tubes/music.html   Discography (links to Spotify)
/music/               Music — everything on Spotify
```

It's a static site — plain HTML, one CSS file, one JS file. No build step,
no framework, no dependencies.

## Adding real photos

1. Drop image files into `/images/` (e.g. `/images/tubes/fillmore-1976.jpg`).
2. In the relevant HTML file, find a tile like:

   ```html
   <div class="tile span-6 tile--bw tile--placeholder v1">Fillmore</div>
   ```

   and replace it with:

   ```html
   <div class="tile span-6 tile--bw">
     <img src="/images/tubes/fillmore-1976.jpg" alt="The Tubes at the Fillmore, 1976" />
     <div class="tile__caption">Fillmore · 1976</div>
   </div>
   ```

Tile classes:
- `span-3`, `span-4`, `span-6`, `span-8`, `span-12` — column spans (12-col grid)
- `tile--bw` — desaturate to black & white
- `tile--tall`, `tile--wide`, `tile--square` — aspect ratio

## Adding a hero photo

Open the page's HTML and replace the hero block:

```html
<header class="hero hero--poster">
  <div class="hero__bg"></div>
```

with:

```html
<header class="hero">
  <div class="hero__bg" style="background-image:url(/images/hero-bill.jpg);"></div>
```

## Running locally

Any static server will do. Two easy options:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open http://localhost:8000.

## Deploy — Render.com auto-deploy

The repo ships with a `render.yaml` blueprint, so Render can wire everything
up on the first push. See the full walkthrough in [DEPLOY.md](./DEPLOY.md).
