# Project Context

## Project Overview

- Personal portfolio and engineering blog for Rajesh Pandey.
- Built with Astro 7, TypeScript, Svelte, Tailwind CSS, and Bun.
- The canonical production origin is `https://rajeshpandey.dev`.
- DNS and Netlify domain configuration are managed outside this repository.

## Architecture

- `astro.config.mjs` defines Astro's canonical `site` origin for generated routes, sitemap, RSS, and `Astro.site`.
- `src/consts.ts` contains shared site, author, social, and SEO identity values, including the fallback `SITE_URL`.
- `src/components/BaseHead.astro` derives canonical, Open Graph, Twitter, image, sitemap, and RSS metadata from `Astro.site`.
- `src/lib/seo.ts` builds Person, ProfilePage, WebSite, Blog, BlogPosting, and breadcrumb JSON-LD from `Astro.site`, falling back to `SITE_URL`.
- `src/pages/llms.txt.ts` builds absolute discovery links from the route context's configured site origin.
- `scripts/generate-assets.mjs` generates the social card, favicons, application icons, and optimized portrait assets.

## Decisions

- Decision: use `https://rajeshpandey.dev` as the sole production origin in source and generated output.
  - Rationale: keeps sitemap, RSS, canonical metadata, social metadata, JSON-LD, and discovery endpoints consistent.
  - Alternative: retain the previous `.site` origin or handle the legacy-domain redirect in application code.
  - Status: implemented; Netlify redirects the legacy `.site` domain through the built `_redirects` file.
- Decision: keep URL construction centralized through `Astro.site` and `SITE_URL`.
  - Rationale: avoids duplicating absolute URLs across templates and schema builders.
  - Status: current convention.

## Current Tasks

- None.

## Completed Work

- Updated the configured site origin, shared fallback URL, crawler metadata, `llms.txt` fallback, and social-card source to `rajeshpandey.dev`.
- Added a permanent Netlify redirect from `rajeshpandey.site` paths to their equivalents on `rajeshpandey.dev`.
- Added the Netlify deploy-status badge beneath the README heading.
- Regenerated the brand assets, visually checked the social card, and completed a production build.
- Confirmed the previous production domain no longer appears in repository or generated build output.

## Important Discoveries

- `BaseHead.astro` and `src/lib/seo.ts` contain no hardcoded production domain; their output follows `Astro.site` and `SITE_URL`.
- `package.json` has no `homepage` field.
- Astro copies `public/_redirects` unchanged to `dist/_redirects`, where Netlify can consume it.
- The social-card domain is rasterized into `public/og.png`, so the asset generator must run whenever it changes.

## Technical Debt

- The README still contains the original Astro starter content and has not been rewritten as project-specific documentation.

## Open Questions

- None for the domain migration.

## Working Agreements

- Use Bun for package scripts and builds.
- Start development servers with `astro dev --background`.
- Keep canonical head metadata in `src/components/BaseHead.astro` and structured-data builders in `src/lib/seo.ts`.
- Regenerate brand and SEO assets with `node scripts/generate-assets.mjs`; do not hand-edit generated raster assets.
- Exclude draft blog posts from builds, listings, sitemap, RSS, and `llms.txt`.

## Handoff Notes

- Current objective: maintain the portfolio at the canonical `rajeshpandey.dev` origin.
- Current status: the domain migration, asset regeneration, and production verification are complete.
- Blockers: none.
- Next steps: deploy through the existing workflow after the external domain configuration is ready.
- Relevant files: `astro.config.mjs`, `src/consts.ts`, `src/pages/llms.txt.ts`, `public/_redirects`, `public/robots.txt`, `scripts/generate-assets.mjs`, and `README.md`.
- Useful commands: `node scripts/generate-assets.mjs` and `bun run build`.
