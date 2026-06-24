import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { AUTHOR } from './consts';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Alt text for the hero image — keep meaningful for a11y + SEO.
			heroImageAlt: z.string().optional(),
			// Topical tags → article:tag meta + BlogPosting keywords.
			tags: z.array(z.string()).default([]),
			// Post author (defaults to the site owner).
			author: z.string().default(AUTHOR.name),
			// Drafts are excluded from build, listings, sitemap, RSS, and llms.txt.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
