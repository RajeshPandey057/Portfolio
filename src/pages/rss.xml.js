import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog', ({ data }) => data.draft !== true)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: `${SITE_TITLE} — Blog`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			author: AUTHOR.email,
			categories: post.data.tags ?? [],
			link: `/blog/${post.id}/`,
		})),
		customData: `<language>en</language>`,
	});
}
