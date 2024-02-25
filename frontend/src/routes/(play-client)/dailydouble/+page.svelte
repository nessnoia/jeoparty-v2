<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore, events } from '$lib/colyseus';
	import WagerSubmittal from '$lib/components/play/client/WagerSubmittal.svelte';
	import type { Room } from 'colyseus.js';
	import type { LayoutData } from '../$types';
	import { browser } from '$app/environment';

	// export let data: LayoutData;

	// let sessionId = data.sessionId;
	let sessionId = '';
	if (browser) {
		sessionId = localStorage.getItem('sessionId') ?? '';
	}

	let score: number;
	let maxWager: number;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		if (player !== undefined) {
			score = player.score;
			maxWager =
				score > room.state.dailyDouble.clueValue ? score : room.state.dailyDouble.clueValue;
		}
	}

	const submitDailyDouble = (e: CustomEvent<{ wager: number }>) => {
		room?.send(events.UpdateDailyDoubleWager, {
			wager: e.detail.wager
		});
		goto('/buzzer');
	};
</script>

<div id="container">
	<WagerSubmittal {maxWager} {score} on:submitWager={submitDailyDouble}
		>Daily Double</WagerSubmittal
	>
</div>

<style>
	#container {
		background-color: var(--black);
		color: var(--white);
		min-height: 100%;
		/* font-size: var(--size-7); */
	}
</style>
