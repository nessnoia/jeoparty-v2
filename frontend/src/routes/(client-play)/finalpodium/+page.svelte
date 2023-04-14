<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	let score = 0;
	let place = 0;

	let sessionId = '';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}

		sessionId = sessionStorage.getItem('sessionId') ?? '';
		roomStore.subscribe((room) => {
			if (room) {
				for (let [id, player] of (room as Room).state.players) {
					place++;
					if (sessionId === id) {
						score = player.score;
						break;
					}
				}
			}
		});
	}
</script>

<h1>Thanks for playing!</h1>
<h2>Final score: ${score}</h2>
<h2>Congratulations! You finished in {place} place.</h2>
