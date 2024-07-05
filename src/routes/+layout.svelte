<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		initializeStores,
		Modal,
		storePopup,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import 'highlight.js/styles/github-dark.css';
	import type { Snippet } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import { pwaInfo } from 'virtual:pwa-info';
	import '../app.postcss';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);
	});
	const modalRegistry: Record<string, ModalComponent> = {
		bookModal: { ref: null }
	};
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	let { children }: { children: Snippet } = $props();
	const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content="{pwaAssetsHead.themeColor.content}" />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
</svelte:head>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="variant-ghost-surface btn btn-sm"
					href="https://discord.gg/EXqV7W8MtY"
					rel="noreferrer">
					Discord
				</a>
				<a
					class="variant-ghost-surface btn btn-sm"
					href="https://twitter.com/SkeletonUI"
					rel="noreferrer">
					Twitter
				</a>
				<a
					class="variant-ghost-surface btn btn-sm"
					href="https://github.com/skeletonlabs/skeleton"
					rel="noreferrer">
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	{@render children()}
</AppShell>
{#await import('$lib/ui/pwa/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}
<Modal components="{modalRegistry}" />
<Toaster theme="light" richColors />
