<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	let score = 0;
	let place = 1;

	let pointsBehind = 100;
	let playerAhead = 'ginny';

	let pointsAhead = 100;
	let playerBehind = 'justis';

	$: buzzersActive = false;

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
		roomStore.subscribe((room) => {
			if (room) {
				(room as Room).state.listen('gameState', (current: string) => {
					if (current == 'podium') {
						goto('/podium');
					}
				});

				(room as Room).state.listen('buzzersActive', (current: boolean) => {
					buzzersActive = current;
				});
			}
		});
	}
</script>

<div class={buzzersActive ? 'active' : ''}>
	<h3>Your score</h3>
	<span>${score}</span>

	<button />

	<p>You are in {place} place</p>
	<p>You are ${pointsBehind} behind {playerAhead}</p>
	<p>You are ${pointsAhead} behind {playerBehind}</p>
</div>

<style>
	.active {
		background-color: blue;
	}
</style>
