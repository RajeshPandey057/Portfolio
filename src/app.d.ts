import 'unplugin-icons/types/svelte';
import 'vite-plugin-pwa/info';
import 'vite-plugin-pwa/pwa-assets';
import 'vite-plugin-pwa/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			userid: string;
			buildDate: string;
			periodicUpdates: boolean;
		}

		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
