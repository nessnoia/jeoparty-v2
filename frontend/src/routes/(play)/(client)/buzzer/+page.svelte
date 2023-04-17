<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Record<string, Player> = {};
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
						name: player.name,
						character: player.character,
						characterColour: player.colour,
						score: player.score
					};
					playerList[id] = playerObj;
				});

				// (room as Room).state.players[sessionId].onChange((curr: any, prev: any) => {

				// })

				let playerIds = Object.keys(playerList);
				for (let i = 0; i < playerIds.length; i++) {
					let id = playerIds[i];
					if (sessionId === id) {
						place = i + 1;
						score = playerList[id].score;

						if (i === 0 && playerList) {
							let nextId = playerIds[i + 1];
							pointsAhead = score - playerList[nextId].score;
							playerBehind = playerList[nextId].name;
						} else if (i === playerIds.length - 1) {
							let prevId = playerIds[i - 1];
							pointsBehind = playerList[prevId].score - score;
							playerAhead = playerList[prevId].name;
						} else {
							let prevId = playerIds[i - 1];
							pointsBehind = playerList[prevId].score - score;
							playerAhead = playerList[prevId].name;

							let nextId = playerIds[i + 1];
							pointsAhead = score - playerList[nextId].score;
							playerBehind = playerList[nextId].name;
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
	{#if place < Object.keys(playerList).length - 1}
		<p>You are ${pointsAhead} behind {playerBehind}.</p>
	{/if}
</div>

<style>
	.active {
		background-color: blue;
	}
</style>
