<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('gameState', (change: any) => {
			if (change == 'buzzer') {
				goto('/buzzer');
			}
		});
	}
</script>

<div id="background">
	<Waiting size={80}>
		<h1>Showing categories</h1>
		<h2>Get ready...</h2>
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

	h2 {
		margin: 0;
		font-size: var(--size-6);
		text-transform: uppercase;
	}
</style>
