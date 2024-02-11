<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus';
	import WagerSubmittal from '$lib/components/play/client/WagerSubmittal.svelte';
	import type { Room } from 'colyseus.js';

	let score: number;
	let sessionId = '';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		if (player !== undefined) {
			score = player.score;
		}
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitWager = (e: CustomEvent<{ wager: number }>) => {
		room?.send(events.FinalJeopartyWager, {
			wager: e.detail.wager
		});
		goto('/finaljeopartywait');
	};
</script>

<div id="background">
	<WagerSubmittal maxWager={score} {score} on:submitWager={submitWager}
		>Final Jeoparty</WagerSubmittal
	>
</div>

<style>
	#background {
		width: 100%;
		height: 100%;
		background-color: var(--black);
		color: var(--white);
		font-size: var(--size-7);
	}
</style>
