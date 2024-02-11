<script lang="ts">
	import { roomStore, states } from '$lib/colyseus';
	import FullPodium from '$lib/components/play/host/FullPodium.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.send('updateGameState', { state: states.FinalPodium });
	}
</script>

<h1>Final Standings</h1>

<FullPodium />
