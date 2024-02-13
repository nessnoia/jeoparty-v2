<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore, states, events } from '$lib/colyseus';
	import FullPodium from '$lib/components/play/host/FullPodium.svelte';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameId = data.gameId;
	let roundNum = data.roundNum;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.send(events.UpdateGameState, { state: states.RoundPodium });
	}

	if (browser) {
		setTimeout(() => {
			goto(`/round/${Number(roundNum) + 1}/${gameId}`);
		}, 8000);
	}
</script>

<div id="container">
	<h1>Standings</h1>

	<FullPodium />
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 5% 0 10% 0;
		color: var(--white);
		background-color: var(--black);
	}

	h1 {
		margin: 0;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-size: var(--size-1);
		text-transform: uppercase;
	}
</style>
