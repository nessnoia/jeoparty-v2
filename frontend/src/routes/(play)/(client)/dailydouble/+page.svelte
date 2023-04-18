<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	let score: number;
	let maxWager: number;

	let sessionId = '';
	let room = $roomStore as Room | undefined;

	const submitDailyDouble = (e: SubmitEvent) => {
		room?.send('updateDailyDoubleWager', {
			wager: Number(new FormData(e.target as HTMLFormElement).get('bet'))
		});
		// goto('/buzzer');
	};

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
		if (room !== undefined) {
			let player = room.state.players.get(sessionId);
			if (player !== undefined) {
				score = player.score;
				maxWager =
					score > room.state.dailyDouble.clueValue ? score : room.state.dailyDouble.clueValue;
			}
		}
	}
</script>

<form on:submit|preventDefault={submitDailyDouble}>
	<span>Your score: ${score ?? ''}</span>
	<span>Max wager: ${maxWager ?? ''}</span>
	<label for="bet">Wager</label>
	<span>$</span><input
		name="bet"
		placeholder="Enter wager"
		type="number"
		required
		min="0"
		max={maxWager}
	/>
	<button type="submit">Submit Wager</button>
</form>
