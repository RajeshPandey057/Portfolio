// /llms.txt is a Markdown summary of the site for LLMs and AI agents at inference
// time (https://llmstxt.org/). Generated dynamically so published blog posts
// are always reflected. Drafts are excluded.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, ORG, SITE_TITLE } from '../consts';

export const GET: APIRoute = async (context) => {
	const site = context.site ?? new URL('https://rajeshpandey.dev');
	const url = (path: string) => new URL(path, site).href;

	const posts = (await getCollection('blog', ({ data }) => data.draft !== true)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const postLines =
		posts.length > 0
			? posts
					.map((p) => `- [${p.data.title}](${url(`/blog/${p.id}/`)}): ${p.data.description}`)
					.join('\n')
			: '- No posts published yet. Writing is in progress.';

	const body = `# ${SITE_TITLE}

> Lead Technical Engineer building cloud architecture, backend services, and the mobile apps behind healthcare platforms. Based in ${AUTHOR.location.locality}, ${AUTHOR.location.region}, ${AUTHOR.location.country}.

${AUTHOR.name} leads technical delivery across ${ORG.name}'s healthcare products, including cloud integration services, patient platforms, and mobile applications. He built Medsi as a side project alongside a full-time role at Tata Consultancy Services, leading its backend, API, and mobile infrastructure through more than 250,000 downloads, over 5,000 consultations, and its 2024 acquisition by HelloWellness. He later served as Lead Software Engineer and Architect at HelloWellness before it merged into ${ORG.name}. Earlier, he built enterprise systems at Tata Consultancy Services.

He works across backend, frontend, mobile, DevOps, and product, with a focus on migrations, data backfills, billing handovers, integrations, and production reliability. He also builds developer and AI tooling.

## Core expertise
- Cloud & integrations: event-driven services on Cloud Functions, Pub/Sub, Cloud Run, Secret Manager, and Elasticsearch; REST APIs, webhook receivers, downstream consumers.
- Platform & migrations: WooCommerce order/subscription migration, Stripe billing handovers, historical backfills, active-order linking.
- Mobile & backend product: React Native and Node.js for subscriptions, reminders, push registration, tenant branding, CI/CD, and release discipline.
- Technical leadership: leading delivery across backend, frontend, mobile, DevOps, QA, and product.

## Pages
- [Home / Profile](${url('/')}): Full profile with selected engineering work, experience, technical focus, side projects, writing, and contact.
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
