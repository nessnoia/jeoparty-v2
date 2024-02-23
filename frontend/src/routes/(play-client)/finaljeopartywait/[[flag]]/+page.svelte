<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore, states } from '$lib/colyseus';
	import Waiting from '$lib/components/play/Waiting.svelte';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let timerActive = false;
	let lastGameStateChange = '';
	let flag = data.flag;

	$: if (lastGameStateChange == states.FinalJeopartyCategory && flag != 'wager') {
		goto('/finaljeopartywager');
	} else if (
		lastGameStateChange == states.FinalJeopartyAnswer &&
		timerActive &&
		flag != 'answer'
	) {
		goto('/finaljeopartyanswer');
	}

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('fjTimerActive', (change: boolean) => {
			timerActive = change;
		});

		room.state.listen('gameState', (change: any) => {
			lastGameStateChange = change;
		});
	}
</script>

<div id="container">
	<Waiting size={100}>
		<h1>Waiting for final jeoparty</h1>
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
		min-height: 100%;
	}

	h1 {
		margin: 0;
		text-transform: uppercase;
	}
</style>
