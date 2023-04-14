<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
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

	$: buzzersActive = false;

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}

		sessionId = sessionStorage.getItem('sessionId') ?? '';
		roomStore.subscribe((room) => {
			if (room) {
				(room as Room).state.listen('gameState', (change: string) => {
					if (change == 'podium') {
						goto('/podium');
					}

					if (change == 'finalpodium') {
						goto('/finalpodium');
					}
				});

				(room as Room).state.listen('buzzersActive', (current: boolean) => {
					buzzersActive = current;
				});

				(room as Room).state.players.forEach((player: any, id: string) => {
					let playerObj = {
						sessionId: id,
						name: player.name,
						character: player.character,
						characterColour: player.colour,
						score: player.score
					};
					playerList.push(playerObj);
				});
				// playerList.sort((p1, p2) => (p1.score > p2.score ? -1 : 1));

				for (let i = 0; i < playerList.length; i++) {
					if (sessionId === playerList[i].sessionId) {
						place = i + 1;
						score = playerList[i].score;
						if (i === 0 && playerList) {
							pointsAhead = score - playerList[i + 1].score;
							playerBehind = playerList[i + 1].name;
						} else if (i === playerList.length - 1) {
							pointsBehind = playerList[i - 1].score - score;
							playerAhead = playerList[i - 1].name;
						} else {
							pointsBehind = playerList[i - 1].score - score;
							playerAhead = playerList[i - 1].name;

							pointsAhead = score - playerList[i + 1].score;
							playerBehind = playerList[i + 1].name;
						}
					}
				}
			}
		});
	}
</script>

<div class={buzzersActive ? 'active' : ''}>
	<h3>Your score</h3>
	<span>${score}</span>

	<button />

	<p>You are in {place} place.</p>
	{#if place > 1}
		<p>You are ${pointsBehind} behind {playerAhead}.</p>
	{/if}
	{#if place < playerList.length - 1}
		<p>You are ${pointsAhead} behind {playerBehind}.</p>
	{/if}
</div>

<style>
	.active {
		background-color: blue;
	}
</style>
