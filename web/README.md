# Style Guide Web Suite

A small TypeScript + CSS single-page app that **parses `../README.md` at runtime**
into the style guide's rules and renders them with navigation, search, deep links,
a dark/light toggle and print support. It is plain DOM code bundled by Vite; there
is no framework.

## How the parsing works

- `src/main.ts` imports the raw markdown (`../../README.md?raw`) and hands it to
  `parseStyleGuide()` in `src/styleguide/parse.ts`.
- The parser walks the markdown line by line:
  - `<a name="...">` lines are buffered and attached to the heading that follows.
  - Headings are classified as **section** (numbered `##`), **rule** (any other
    numbered heading) or **meta** (unnumbered).
  - Body text between headings becomes each node's HTML (rendered with `marked`);
    sub-headings become child nodes.
  - Every anchor, rule number and GitHub-style slug is registered as a deep-link
    alias, so links like `#0.1` and `#textures-dimensions` resolve.
- The leading level-1 heading becomes the guide title. Only the numbered
  top-level sections and their rules are kept; the README's front/back matter
  (repo notice, translations, terminology, contributors, license, amendments)
  and the repeated "Back to Top" links are dropped.

Because parsing happens in the browser against the README string, editing the
markdown and rebuilding is all it takes to update the site.

## Design constraints (intentional)

- **Sharp corners** - a single `border-radius: 0` reset; nothing is rounded.
- **No gradients** - every fill is a flat colour.
- **No visible outlines** - the focus outline is removed and focus is shown with a
  background/border colour change instead.
- **Every text node has a drop shadow** - set once on `body` and inherited.
- **Dark / light mode** - toggled in the header, persisted in `localStorage`, and
  seeded from `prefers-color-scheme` before first paint.

## Local development

```bash
cd web
npm install
npm run dev        # dev server (reads ../README.md)
npm run build      # typecheck + production build into web/dist
npm run preview    # serve the built site
```

## Deploying to GitHub Pages

`.github/workflows/pages.yml` builds `web/` and publishes `web/dist`. In the repo
settings set **Settings -> Pages -> Build and deployment -> Source** to
**GitHub Actions**. After that, every push to `main` that touches `web/**` or
`README.md` redeploys the site.
