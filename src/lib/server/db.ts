import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const db = drizzle(
	postgres({
		host: `${import.meta.env.VITE_HOST}`,
		user: `${import.meta.env.VITE_USER}`,
		database: `${import.meta.env.VITE_DB}`,
		password: `${import.meta.env.VITE_PW}`
	}),
	{ schema }
);
