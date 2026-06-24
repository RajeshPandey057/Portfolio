## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Brand & SEO assets

Social/brand raster assets are **generated**, not hand-edited. After changing the
portrait or brand styling, regenerate them:

```
node scripts/generate-assets.mjs
```

This writes `public/og.png` (1200×630 share card with portrait), `favicon.svg`,
`favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`, `public/portrait-512.jpg`
(schema/social), and `src/assets/portrait-square.jpg` (home-page avatar source). The
1.5 MB `src/assets/portrait.jpg` is the generation source only — never reference it directly.

## SEO conventions

- Page `<head>` is centralized in `src/components/BaseHead.astro` (canonical, robots,
  Open Graph, Twitter, self-hosted fonts, JSON-LD). Pass `schema`, `type`, `image`, etc.
- Structured-data graphs live in `src/lib/seo.ts`; site/author config in `src/consts.ts`.
- Fonts are self-hosted via Astro's font providers in `astro.config.mjs` — do **not**
  add `<link>` tags to fonts.googleapis.com.
- AI/crawler discovery: `public/robots.txt` (welcomes AI bots) and the dynamic
  `src/pages/llms.txt.ts` (auto-lists published posts).
- Blog frontmatter supports `tags`, `author`, `heroImageAlt`, and `draft` (drafts are
  excluded from build, listings, sitemap, RSS, and llms.txt).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
