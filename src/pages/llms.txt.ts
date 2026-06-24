// /llms.txt — a Markdown summary of the site for LLMs / AI agents at inference
// time (https://llmstxt.org/). Generated dynamically so published blog posts
// are always reflected. Drafts are excluded.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, ORG, SITE_TITLE } from '../consts';

export const GET: APIRoute = async (context) => {
	const site = context.site ?? new URL('https://rajeshpandey.site');
	const url = (path: string) => new URL(path, site).href;

	const posts = (await getCollection('blog', ({ data }) => data.draft !== true)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const postLines =
		posts.length > 0
			? posts
					.map((p) => `- [${p.data.title}](${url(`/blog/${p.id}/`)}): ${p.data.description}`)
					.join('\n')
			: '- No posts published yet — writing in progress.';

	const body = `# ${SITE_TITLE}

> Lead Technical Engineer building cloud architecture, backend services, and the mobile apps behind healthcare platforms. Based in ${AUTHOR.location.locality}, ${AUTHOR.location.region}, ${AUTHOR.location.country}.

${AUTHOR.name} leads technical delivery across ${ORG.name}'s healthcare products — cloud integration services, patient platforms, and the mobile apps people actually use. The career path ran through an acquisition and a merger: helped build Medsi (acquired by HelloWellness, where he was Lead Software Engineer & Architect), which then merged into ${ORG.name}. Earlier, built enterprise systems at Tata Consultancy Services.

Works across the whole stack — backend, frontend, mobile, DevOps, and product — and gravitates to the messy parts: migrations, data backfills, billing handovers, and making complex healthcare systems reliable in production. Builds developer and AI tooling on the side.

## Core expertise
- Cloud & integrations: event-driven services on Cloud Functions, Pub/Sub, Cloud Run, Secret Manager, and Elasticsearch; REST APIs, webhook receivers, downstream consumers.
- Platform & migrations: WooCommerce order/subscription migration, Stripe billing handovers, historical backfills, active-order linking.
- Mobile & backend product: React Native and Node.js — subscriptions, reminders, push registration, tenant branding, CI/CD and release discipline.
- Technical leadership: leading delivery across backend, frontend, mobile, DevOps, QA, and product.

## Pages
- [Home / Profile](${url('/')}): Full profile — experience, selected impact, expertise, side projects, and contact.
- [Blog](${url('/blog/')}): Writing on cloud architecture, backend systems, migrations, and reliable healthcare software.

## Blog posts
${postLines}

## Contact
- Email: ${AUTHOR.email}
- GitHub: ${AUTHOR.sameAs[0]}
- LinkedIn: ${AUTHOR.sameAs[1]}

## Resources
- [Sitemap](${url('/sitemap-index.xml')})
- [RSS feed](${url('/rss.xml')})
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
