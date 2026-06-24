// Structured-data (JSON-LD) builders and URL helpers.
//
// Everything is centralized here so pages stay declarative: a page imports a
// builder, passes `Astro.site`, and drops the result into <BaseHead schema={...} />.
// Nodes use stable `@id` anchors and reference each other, producing one coherent
// schema.org graph that search engines and AI crawlers can resolve.

import {
	AUTHOR,
	ORG,
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
} from '../consts';

type Site = URL | string | undefined;
export type SchemaNode = Record<string, unknown>;

/** Resolve a path against the configured site origin into an absolute URL. */
export function abs(path: string, site: Site): string {
	const base = (site ?? SITE_URL).toString();
	return new URL(path, base).href;
}

// Stable graph anchors so nodes can cross-reference without duplication.
const personId = (site: Site) => abs('/#person', site);
const websiteId = (site: Site) => abs('/#website', site);
const orgId = (site: Site) => abs('/#organization', site);

/** The current employer, reusable as a publisher reference. */
export function organizationNode(site: Site): SchemaNode {
	return {
		'@type': 'Organization',
		'@id': orgId(site),
		name: ORG.name,
	};
}

/** The person the whole site is about. Referenced by every other node. */
export function personNode(site: Site): SchemaNode {
	return {
		'@type': 'Person',
		'@id': personId(site),
		name: AUTHOR.name,
		givenName: AUTHOR.givenName,
		familyName: AUTHOR.familyName,
		url: abs('/', site),
		image: abs(AUTHOR.image, site),
		jobTitle: AUTHOR.jobTitle,
		description: SITE_DESCRIPTION,
		email: AUTHOR.email,
		worksFor: { '@type': 'Organization', name: ORG.name },
		knowsAbout: AUTHOR.knowsAbout,
		sameAs: AUTHOR.sameAs,
		address: {
			'@type': 'PostalAddress',
			addressLocality: AUTHOR.location.locality,
			addressRegion: AUTHOR.location.region,
			addressCountry: AUTHOR.location.countryCode,
		},
	};
}

/** The website itself, attributed to and published by the person. */
export function webSiteNode(site: Site): SchemaNode {
	return {
		'@type': 'WebSite',
		'@id': websiteId(site),
		url: abs('/', site),
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		inLanguage: 'en',
		publisher: { '@id': personId(site) },
		author: { '@id': personId(site) },
	};
}

/** Breadcrumb trail. Pass [{ name, path }] from home → current page. */
export function breadcrumbNode(
	site: Site,
	items: Array<{ name: string; path: string }>,
): SchemaNode {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: abs(item.path, site),
		})),
	};
}

/**
 * Home page: a ProfilePage whose mainEntity is the person, plus the website and
 * organization, in a single graph.
 */
export function homePageGraph(site: Site): SchemaNode {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfilePage',
				'@id': abs('/#profilepage', site),
				url: abs('/', site),
				name: `${SITE_TITLE} — ${AUTHOR.jobTitle}`,
				isPartOf: { '@id': websiteId(site) },
				about: { '@id': personId(site) },
				mainEntity: { '@id': personId(site) },
				inLanguage: 'en',
			},
			personNode(site),
			webSiteNode(site),
			organizationNode(site),
		],
	};
}

/** Blog listing page: CollectionPage + Blog, attributed to the person. */
export function blogIndexGraph(
	site: Site,
	posts: Array<{ title: string; description: string; path: string; pubDate: Date }>,
): SchemaNode {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['CollectionPage', 'Blog'],
				'@id': abs('/blog/#blog', site),
				url: abs('/blog/', site),
				name: `Blog — ${SITE_TITLE}`,
				description:
					'Field notes on cloud architecture, backend systems, migrations, and building reliable healthcare software.',
				isPartOf: { '@id': websiteId(site) },
				inLanguage: 'en',
				author: { '@id': personId(site) },
				publisher: { '@id': personId(site) },
				blogPost: posts.map((post) => ({
					'@type': 'BlogPosting',
					headline: post.title,
					description: post.description,
					url: abs(post.path, site),
					datePublished: post.pubDate.toISOString(),
					author: { '@id': personId(site) },
				})),
			},
			personNode(site),
			webSiteNode(site),
		],
	};
}

/** A single blog post: BlogPosting + BreadcrumbList. */
export function blogPostGraph(
	site: Site,
	post: {
		title: string;
		description: string;
		path: string;
		pubDate: Date;
		updatedDate?: Date;
		image: string;
		imageAlt?: string;
		tags?: string[];
	},
): SchemaNode {
	const url = abs(post.path, site);
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BlogPosting',
				'@id': `${url}#blogposting`,
				headline: post.title,
				description: post.description,
				url,
				mainEntityOfPage: url,
				image: post.image,
				datePublished: post.pubDate.toISOString(),
				dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
				author: { '@id': personId(site) },
				publisher: { '@id': personId(site) },
				isPartOf: { '@id': websiteId(site) },
				inLanguage: 'en',
				...(post.tags && post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
			},
			breadcrumbNode(site, [
				{ name: 'Home', path: '/' },
				{ name: 'Blog', path: '/blog/' },
				{ name: post.title, path: post.path },
			]),
			personNode(site),
			webSiteNode(site),
		],
	};
}
