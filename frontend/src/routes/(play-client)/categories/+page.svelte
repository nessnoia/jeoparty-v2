<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore, states } from '$lib/colyseus';
	import Waiting from '$lib/components/play/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('gameState', (change: any) => {
			if (change == states.Buzzer) {
				goto('/buzzer');
			}
		});
	}
</script>

<div id="container">
	<Waiting size={80}>
		<h1>Showing categories</h1>
		<h3>Get ready...</h3>
	</Waiting>
</div>

<style>
	#container {
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
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		text-transform: uppercase;
	}
</style>
