<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			// uncomment following code if you want check for updates
			// r && setInterval(() => {
			//    console.log('Checking for sw update')
			//    r.update()
			// }, 20000 /* 20s for testing purposes */)
			console.warn('SW Registered:');
			console.warn(r);
		},
		onRegisterError(error) {
			console.error('SW registration error', error);
		}
	});

	$effect(() => {
		if ($needRefresh || $offlineReady) {
			toast('New content available, click to reload', {
				action: {
					label: 'Reload',
					onClick: () => void updateServiceWorker(true)
				}
			});
		}
	});
</script>
