<script lang="ts">
	import { roomStore, states, events } from '$lib/colyseus';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let sessionId = data.sessionId;

	let score: number;
	let place: number;

	let pointsBehind: number;
	let playerAhead: string;
	let pointsAhead: number;
	let playerBehind: string;

	let wonBuzz = false;
	let lostBuzz = false;
	let buzzersActive = false;
	let clueOpen = false;

	let numPlayers = 0;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		updatePlayerInfo(room.state.players);
		room.state.listen('gameState', (change: string) => {
			// Question has been closed, clear buzzer colours.
			if (change == states.Buzzer) {
				wonBuzz = false;
				lostBuzz = false;
				clueOpen = false;
			}

			if (change == states.ClueOpen) {
				clueOpen = true;
				wonBuzz = false;
				lostBuzz = false;
			}

			if (change == states.TimesUp) {
				// Need this so if someone wins the buzz, when the timer runs out their screen stays green.
				if (!wonBuzz && clueOpen) {
					lostBuzz = true;
				}
			}
		});

		room.state.listen('buzzersActive', (current: boolean) => {
			buzzersActive = current;
		});

		room.state.listen('buzzerWinner', (winId: string) => {
			if (winId === sessionId && clueOpen) {
				wonBuzz = true;
			} else if (winId === '') {
				wonBuzz = false;
				lostBuzz = false;
			} else if (clueOpen) {
				lostBuzz = true;
			}
		});

		room.state.listen('players', (playersChange: any) => {
			updatePlayerInfo(playersChange);
			numPlayers = playersChange.size;
		});
	}

	const buzz = () => {
		if (clueOpen) {
			room?.send(events.Buzzer);
		}
	};

	const updatePlayerInfo = (playersMap: any) => {
		let playerIds: string[] = Array.from(playersMap.keys());
		let players: Player[] = Array.from(playersMap.values());
		for (let i = 0; i < players.length; i++) {
			let player = players[i];
			if (sessionId === playerIds[i]) {
				place = player.place;
				score = player.score;

				if (place != -1) {
					if (place === 1 && players.length != 1) {
						let nextIdx = place;
						pointsAhead = score - players[nextIdx].score;
						playerBehind = players[nextIdx].name;
					} else if (place === players.length && players.length != 1) {
						let prevIdx = place - 2;
						pointsBehind = players[prevIdx].score - score;
						playerAhead = players[prevIdx].name;
					} else if (players.length != 1) {
						let nextIdx = place;
						let prevIdx = place - 2;
						pointsBehind = players[prevIdx].score - score;
						playerAhead = players[prevIdx].name;

						pointsAhead = score - players[nextIdx].score;
						playerBehind = players[nextIdx].name;
					}
					break;
				}
			}
		}
	};
</script>

<div id="container" class:active={buzzersActive} class:winner={wonBuzz} class:loser={lostBuzz}>
	<h1>Your score</h1>
	<div id="score"><span id="dollar-sign">$</span><span id="score-val">{score}</span></div>

	<button id="buzzer" on:click={buzz} />

	<div id="stats">
		{#if place !== undefined && place != -1}
			<p>You are in {place} place.</p>
			{#if pointsBehind !== undefined && place != 1}
				<p>You are ${pointsBehind} behind {playerAhead}.</p>
			{/if}
			{#if pointsAhead !== undefined && place != numPlayers}
				<p>You are ${pointsAhead} ahead of {playerBehind}.</p>
			{/if}
		{/if}
	</div>
</div>

<style>
	h1 {
		text-transform: uppercase;
		font-size: var(--size-6);
		margin: 8vh 0 2% 0;
		color: var(--white);
	}

	#container {
		background-color: var(--primary-700);
		padding: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		justify-content: space-between;
	}

	#score {
		background-color: var(--white);
		padding: 1.5vh 2.5%;
		width: 50%;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	#dollar-sign {
		font-size: var(--size-7);
	}

	#score-val {
		text-align: center;
		flex-grow: 2;
		font-size: var(--size-6);
	}

	#buzzer {
		margin: 5vh 0;
		max-height: 80vw;
		flex-grow: 2;
		aspect-ratio: 1 / 1;
		border: 15px var(--primary-200) outset;
		background-color: var(--primary-100);
	}

	#buzzer:active {
		border-color: var(--primary-300);
	}

	#stats {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
		height: 15%;
		font-size: var(--size-8);
		font-weight: bold;
		color: var(--white);
	}

	#stats p {
		margin: 0;
	}

	#container.active {
		background-color: var(--secondary-100);
	}

	.active h1 {
		color: var(--black);
	}

	.active #buzzer {
		border-color: var(--secondary-300);
		background-color: var(--secondary-200);
	}

	.active #buzzer:active {
		border-color: var(--secondary-400);
	}

	.active #stats {
		color: var(--black);
	}

	#container.winner {
		background-color: green;
	}

	.winner #buzzer {
		border-color: forestgreen;
		background-color: darkseagreen;
	}

	.winner #buzzer:active {
		border-color: darkgreen;
	}

	#container.loser {
		background-color: red;
	}

	.loser #buzzer {
		border-color: firebrick;
		background-color: tomato;
	}

	.loser #buzzer:active {
		border-color: darkred;
	}
</style>
