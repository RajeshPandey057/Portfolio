import type { Config } from 'drizzle-kit';

export default {
	strict: true,
	verbose: true,
	schema: './src/lib/db/schema.ts',
	dialect: 'postgresql',
	out: './.drizzle',
	dbCredentials: {
		url: import.meta.env.VITE_DB_CONN
	}
} satisfies Config;
