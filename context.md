# Project Context

## Project Overview

- Personal portfolio and engineering blog for Rajesh Pandey.
- Primary goals: communicate senior engineering hireability, document production experience, and make first-hand technical writing easy to discover and read.
- Built with Astro 7, TypeScript, Svelte, Tailwind CSS, and Bun.
- The canonical production origin is `https://rajeshpandey.dev`.
- DNS and Netlify domain configuration are managed outside this repository.

## Architecture

- `src/pages/index.astro` is the portfolio homepage and hiring funnel.
- `src/pages/blog/index.astro` is the editorial blog index.
- `src/pages/blog/[...slug].astro` renders published content entries and selects related posts.
- `src/layouts/BlogPost.astro` owns article metadata, responsive hero media, takeaways, table of contents, author context, and related reading.
- `src/styles/global.css` contains the shared visual system, responsive layout, light/dark tokens, motion, focus states, and article typography.
- `src/components/Header.astro` and `src/components/Footer.astro` provide the shared site shell.
- `src/components/BaseHead.astro` centralizes canonical, robots, Open Graph, Twitter, font, feed, sitemap, and JSON-LD output.
- `src/lib/seo.ts` builds Person, ProfilePage, WebSite, Blog, BlogPosting, and breadcrumb graphs.
- `src/pages/llms.txt.ts`, `public/robots.txt`, the sitemap integration, and RSS provide crawler and feed discovery.
- `scripts/generate-assets.mjs` generates the portrait-derived brand, favicon, application icon, and default social assets.

## Decisions

- Decision: present the homepage as a personal engineering dossier rather than a product or consulting landing page.
  - Rationale: a polished outcome-led redesign obscured Rajesh behind product-marketing patterns. Recruiters and engineering leaders need the person, role, ownership, technical decisions, and work samples first.
  - Implementation: personal introduction and compact portrait, sticky section index, project-led evidence, visible role and stack details, concise experience, and restrained developer-native interactions. The blog keeps its editorial reading system.
  - Status: implemented.
- Decision: keep the existing route structure and canonical production origin.
  - Rationale: protects existing links and search continuity during the redesign.
  - Status: implemented.
- Decision: lead the homepage with outcomes rather than a long résumé-style inventory.
  - Rationale: hiring managers need positioning, evidence, and contact paths in the first scan.
  - Status: implemented.
- Decision: use article-specific editorial illustrations and responsive derivatives.
  - Rationale: improves visual discovery, social previews, and representative Article structured data.
  - Status: implemented for both published posts.
- Decision: omit global sitemap `lastmod`, `changefreq`, and `priority`.
  - Rationale: a build timestamp is not an accurate content modification date, and synthetic freshness signals reduce crawler trust.
  - Status: implemented.
- Decision: keep `llms.txt` as supplemental discovery content rather than treating it as a ranking mechanism.
  - Rationale: search and generative discovery still depend primarily on crawlability, original content, structure, internal links, and authority.
  - Status: current convention.
- Decision: use optional interactions for personality without obstructing hiring information.
  - Rationale: developer portfolios benefit from memorable craft, but the primary path must remain fast, semantic, and accessible.
  - Implementation: a keyboard-accessible command palette and a Konami-code debug mode. Both are progressively enhanced and honor reduced-motion styling.
  - Status: implemented.
- Decision: give light and dark modes distinct but complementary color identities.
  - Rationale: cobalt with cool mineral neutrals communicates clinical trust and technical precision more clearly than warm cream, cold monochrome, or wellness-adjacent forest. The warm terracotta dark theme remains the stronger low-light expression.
  - Implementation: light mode uses cobalt accents over blue-gray surfaces; dark mode retains its existing charcoal and terracotta tokens.
  - Status: implemented.

## Current Tasks

- None in progress.

## Completed Work

- Reframed the homepage around Rajesh as an engineer: personal introduction, selected engineering work, ownership and decision evidence, experience, technical focus, side projects, writing, about, and contact.
- Added functional keyboard navigation through `Cmd/Ctrl+K`, command filtering, direct résumé/GitHub/contact actions, and a hidden debug-mode easter egg.
- Replaced the nested desktop scroller, rotating title, count-up metrics, aurora, animated grid, glowing status dot, and spinning border treatment with normal document flow and restrained motion.
- Unified navigation and footer behavior across every route, including a skip link, visible focus states, mobile navigation, and current-page semantics.
- Rebuilt the blog index with a clear editorial hierarchy, featured article, topics, reading time, RSS discovery, and semantic article headings.
- Rebuilt article pages with a visible deck, responsive hero art, key takeaways, table of contents, readable typography, author context, related reading, and internal links.
- Added concise search titles, updated descriptions, article update dates, topic-specific cover art, descriptive alt text, and three structured-data image aspect ratios per post.
- Updated visible content and discovery copy to keep the Medsi founder role, acquisition story, and measurable outcomes consistent.
- Removed the ignored global meta-keywords output and inaccurate global sitemap freshness fields.
- Recalibrated light mode to a cool cobalt and mineral-white palette, while preserving the warm terracotta dark theme.
- Simplified the homepage hero to two distinct actions: selected work and résumé. GitHub remains available in the global navigation.
- Verified a production build, built redirect artifact, generated sitemap, canonical metadata, responsive image output, mobile overflow, heading structure, image alt text, and article table-of-contents links.

## Important Discoveries

- The portfolio already contained strong evidence: 250,000+ Medsi downloads, 5,000+ consultations, a 2024 acquisition, a live WooCommerce-to-Stripe migration, and 7+ production integrations. The main issue was prioritization, not a lack of credible material.
- Outcome-led hero copy, oversized case imagery, capability cards, and repeated conversion CTAs made the first redesign feel like a product or agency site. Developer identity is clearer when the page leads with the person and makes each claim resolve into role, system, decision, and result.
- The previous blog inherited generic Bear/Astro styling and conflicted with the homepage theme.
- Both posts had no hero image, so article listings and social metadata fell back to generic branding.
- Astro's font and image pipeline requires local network access during builds in the restricted development environment.
- `public/_redirects` continues to be copied unchanged to `dist/_redirects`.

## Technical Debt

- The blog has only two articles. Search visibility will depend more on publishing deeper first-hand material and earning relevant links than on additional metadata.
- Tag archive or search routes are intentionally deferred until the article library is large enough to justify them.
- The existing posts can grow into deeper case studies with architecture diagrams, anonymized failure examples, reconciliation details, and primary-source references.
- The README still contains the original Astro starter content and should be rewritten as project-specific documentation.

## Open Questions

- Decide whether future homepage conversion should prioritize consulting engagements, full-time senior roles, or both. The current design supports consulting without hiding broader hireability.
- After deployment, confirm whether production hosting normalizes trailing-slash variants consistently before changing Astro's permissive `trailingSlash: 'ignore'` setting.

## Working Agreements

- Use Bun for package scripts and builds.
- Start development servers with `astro dev --background`.
- Preserve existing public route slugs unless a redirect plan is approved.
- Keep canonical head metadata in `src/components/BaseHead.astro` and structured-data builders in `src/lib/seo.ts`.
- Use shared visual tokens and components from `src/styles/global.css`; do not reintroduce unrelated page-local themes.
- Give every published post an article-specific image, meaningful alt text, concise search title, takeaways, tags, and accurate publication/update dates.
- Regenerate portrait-derived brand and SEO assets with `node scripts/generate-assets.mjs`; do not hand-edit generated raster assets.
- Exclude draft blog posts from builds, listings, sitemap, RSS, and `llms.txt`.
- Keep structured data aligned with visible claims.

## Handoff Notes

- Current objective: maintain and extend the personal developer portfolio and editorial engineering blog.
- Current status: implementation, production build, responsive browser review, interaction testing, and static checks are complete. No production deployment was performed.
- Blockers: none.
- Next steps:
  1. Deploy through the existing hosting workflow.
  2. Validate live article URLs in Google Rich Results Test and Search Console URL Inspection.
  3. Submit or refresh the sitemap in Google Search Console and Bing Webmaster Tools.
  4. Monitor Core Web Vitals, search queries, generative-search visibility, and contact conversions.
  5. Publish additional evidence-rich articles in the four established topic clusters.
- Relevant files: `src/pages/index.astro`, `src/pages/blog/index.astro`, `src/layouts/BlogPost.astro`, `src/styles/global.css`, `src/content/blog/`, `src/components/BaseHead.astro`, `src/lib/seo.ts`, `src/pages/llms.txt.ts`, `public/robots.txt`.
- Useful commands: `./node_modules/.bin/astro dev --background`, `bun run build`, `node scripts/generate-assets.mjs`, and `git diff --check`.
