// Central site + SEO configuration.
// Imported across pages, layouts, structured data, and AI/discovery endpoints.

export const SITE_TITLE = 'Rajesh Pandey';
export const SITE_TAGLINE = 'Lead Technical Engineer';
export const SITE_DESCRIPTION =
	'Lead Technical Engineer building cloud architecture, backend services, and the mobile apps behind healthcare platforms. I work across backend, frontend, mobile, and DevOps — and gravitate to the messy parts: migrations, integrations, and keeping production reliable.';

// Canonical production origin. Keep in sync with `site` in astro.config.mjs.
export const SITE_URL = 'https://rajeshpandey.site';

// BCP-47 page language and Open Graph locale.
export const SITE_LANG = 'en';
export const SITE_LOCALE = 'en_US';

// Default Open Graph / Twitter share image (generated into /public by scripts/generate-assets.mjs).
export const OG_IMAGE = {
	src: '/og.png',
	width: 1200,
	height: 630,
	alt: 'Rajesh Pandey — Lead Technical Engineer building cloud, backend, and mobile for healthcare platforms.',
};

// The person this site is about. Powers schema.org Person/ProfilePage and meta tags.
export const AUTHOR = {
	name: 'Rajesh Pandey',
	givenName: 'Rajesh',
	familyName: 'Pandey',
	jobTitle: 'Lead Technical Engineer',
	email: 'rajesh-pandey@outlook.in',
	// A real square portrait re-encoded for social/structured-data use.
	image: '/portrait-512.jpg',
	location: {
		locality: 'Surat',
		region: 'Gujarat',
		country: 'India',
		countryCode: 'IN',
	},
	sameAs: [
		'https://github.com/RajeshPandey057',
		'https://www.linkedin.com/in/rajeshpandey057/',
	],
	knowsAbout: [
		'Cloud Architecture',
		'Backend Engineering',
		'Mobile Development',
		'Node.js',
		'TypeScript',
		'React Native',
		'Google Cloud Platform',
		'Cloud Functions',
		'Pub/Sub',
		'Elasticsearch',
		'Stripe',
		'REST APIs',
		'CI/CD',
		'DevOps',
		'System Migrations',
		'Healthcare Technology',
		'Technical Leadership',
	],
};

// Current employer — schema.org Organization (worksFor) + structured data publisher.
export const ORG = {
	name: 'Allia Health Group',
};

// Prior workplaces, surfaced in the Person knowsAbout / worksFor history narrative.
export const PAST_ORGS = [
	{ name: 'HelloWellness' },
	{ name: 'Medsi' },
	{ name: 'Tata Consultancy Services' },
];

export const SOCIAL = {
	github: 'https://github.com/RajeshPandey057',
	linkedin: 'https://www.linkedin.com/in/rajeshpandey057/',
	email: 'mailto:rajesh-pandey@outlook.in',
};

// Topical keywords. Kept conservative — used for the <meta name="keywords"> hint and llms.txt.
export const SITE_KEYWORDS = [
	'Rajesh Pandey',
	'Lead Technical Engineer',
	'Cloud Architect',
	'Backend Engineer',
	'Healthcare technology engineer',
	'Node.js',
	'TypeScript',
	'React Native',
	'Google Cloud Platform',
	'Stripe integration',
	'Software architecture',
];
