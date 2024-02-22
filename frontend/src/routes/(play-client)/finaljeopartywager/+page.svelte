<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore, events } from '$lib/colyseus';
	import WagerSubmittal from '$lib/components/play/client/WagerSubmittal.svelte';
	import type { Room } from 'colyseus.js';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	let sessionId = data.sessionId;

	let score: number;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		if (player !== undefined && player.score > 0) {
			score = player.score;
		} else {
			goto('/finalpodium');
		}
	}

	const submitWager = (e: CustomEvent<{ wager: number }>) => {
		room?.send(events.FinalJeopartyWager, {
			wager: e.detail.wager
		});
		goto('/finaljeopartywait/wager');
	};
</script>

<div id="container">
	<WagerSubmittal maxWager={score} {score} on:submitWager={submitWager}>Wager</WagerSubmittal>
</div>

<style>
	#container {
		background-color: var(--black);
		color: var(--white);
	}
</style>
