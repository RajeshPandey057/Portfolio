<script lang="ts">
	import NotFound from '$lib/svg/NotFound.svelte';
</script>

<svelte:head>
	<title>Lost 😰 | RajeshPandey</title>
</svelte:head>
<!-- Section 1 -->
<section
	class="container relative grid max-w-7xl grid-cols-1 gap-y-6 p-7 md:mt-20 md:grid-cols-2 md:gap-x-20">
	<div class="space-y-10 place-self-center">
		<p class="text-4xl font-semibold md:text-5xl">Lost your way ?</p>
		<p class="text-base font-normal">
			The requested page doesn&apos;t exists 😓, please check URL or contact Developers.
		</p>
	</div>
	<div class=" ">
		<NotFound />
	</div>
</section>
