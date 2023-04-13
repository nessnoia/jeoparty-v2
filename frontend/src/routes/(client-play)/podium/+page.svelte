<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	let score = 0;
	let place = 1;

	let pointsBehind = 100;
	let playerAhead = 'ginny';

	let pointsAhead = 100;
	let playerBehind = 'justis';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}

		roomStore.subscribe((room) => {
			if (room) {
				(room as Room).state.listen('gameState', (change: string) => {
					if (change == 'showCategories') {
						goto('/categories');
					}
				});
			}
		});
	}
</script>

<Waiting>
	<h1>Waiting for next round</h1>
</Waiting>

<p>Your score: ${score}</p>
<p>You are in {place} place</p>
<p>You are ${pointsBehind} behind {playerAhead}</p>
<p>You are ${pointsAhead} behind {playerBehind}</p>
