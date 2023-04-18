<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room?.state.listen('gameState', (change: any) => {
			if (change == 'finalJeopartyCategory') {
				goto('/finaljeopartywager');
			}

			if (change == 'finalJeopartyAnswer') {
				goto('/finaljeopartyanswer');
			}

			if (change == 'finalPodium') {
				goto('/finalpodium');
			}
		});
	}
</script>

<Waiting>
	<h1>Waiting for final jeoparty.</h1>
</Waiting>
