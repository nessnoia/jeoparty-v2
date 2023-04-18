<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Player[] = [];
	let sessionId = '';

	let score = 0;
	let place = 0;

	let pointsBehind = 0;
	let playerAhead = '';

	let pointsAhead = 0;
	let playerBehind = '';

	let room = $roomStore as Room | undefined;

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
		if (room !== undefined) {
			room.state.listen('gameState', (change: string) => {
				if (change == 'showCategories') {
					goto('/categories');
				}
			});

			let playerIds: string[] = Array.from(room.state.players.keys());
			let players: Player[] = Array.from(room.state.players.values());
			room.state.listen('players', () => {
				for (let i = 0; i < players.length; i++) {
					let player = players[i];
					if (sessionId === playerIds[i]) {
						place = player.place;
						score = player.score;

						if (place != -1) {
							if (place === 1) {
								pointsAhead = score - players[place + 1].score;
								playerBehind = players[place + 1].name;
								pointsBehind = -1;
							} else if (place === players.length - 1) {
								pointsBehind = players[place - 1].score - score;
								playerAhead = players[place - 1].name;
								pointsAhead = -1;
							} else {
								pointsBehind = players[place - 1].score - score;
								playerAhead = players[place - 1].name;

								pointsAhead = score - players[place + 1].score;
								playerBehind = players[place + 1].name;
							}
							break;
						}
					}
				}
			});
		}
	}
</script>

<Waiting>
	<h1>Waiting for next round</h1>
</Waiting>

<p>Your score: ${score}</p>
<p>You are in {place} place.</p>
{#if place > 1}
	<p>You are ${pointsBehind} behind {playerAhead}.</p>
{/if}
{#if place < playerList.length - 1}
	<p>You are ${pointsAhead} behind {playerBehind}.</p>
{/if}
