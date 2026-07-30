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
			seoTitle: z.string().optional(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Keep hero image alt text meaningful for accessibility and search.
			heroImageAlt: z.string().optional(),
			// Topical tags → article:tag meta + BlogPosting keywords.
			tags: z.array(z.string()).default([]),
			takeaways: z.array(z.string()).default([]),
			// This site currently has one author. Keep visible and structured metadata aligned.
			author: z.literal(AUTHOR.name).default(AUTHOR.name),
			// Drafts are excluded from build, listings, sitemap, RSS, and llms.txt.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
