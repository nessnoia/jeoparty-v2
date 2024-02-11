<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore, states } from '$lib/colyseus';
	import Waiting from '$lib/components/play/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	let timerActive = false;
	let lastGameStateChange = '';

	$: if (lastGameStateChange == states.FinalJeopartyCategory) {
		goto('/finaljeopartywager');
	} else if (lastGameStateChange == states.FinalJeopartyAnswer && timerActive) {
		goto('/finaljeopartyanswer');
	}

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('fjTimerActive', (change: boolean) => {
			timerActive = change;
		});

		room.state.listen('gameState', (change: any) => {
			if (change == states.FinalPodium) {
				goto('/finalpodium');
			}
			lastGameStateChange = change;
		});
	}
</script>

<div id="background">
	<Waiting size={100}>
		<h1>Waiting for final jeoparty</h1>
	</Waiting>
</div>

<style>
	#background {
		width: 100%;
		height: 100%;
		color: var(--white);
		background-color: var(--black);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		padding: 0 8%;
	}

	h1 {
		margin: 0;
		font-size: var(--size-4);
		text-transform: uppercase;
	}
</style>
