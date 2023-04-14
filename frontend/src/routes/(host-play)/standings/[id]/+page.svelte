<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import FullPodium from '$lib/components/play/FullPodium.svelte';

	if (browser) {
		roomStore.subscribe((room: any) => {
			if (room) {
				room.send('updateGameState', { state: 'finalpodium' });
			}
		});
	}
</script>

<h1>Final Standings</h1>

<FullPodium />
