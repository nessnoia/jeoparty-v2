<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus';
	import BuzzersActiveLights from '$lib/components/play/host/BuzzersActiveLights.svelte';
	import PlayBoard from '$lib/components/play/host/PlayBoard.svelte';
	import PlayerDock from '$lib/components/play/host/PlayerDock.svelte';
	import Timer from '$lib/components/play/host/Timer.svelte';
	import type { GameData } from '$lib/database-models/game-data';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameData = data.gameData?.data as GameData;
	let roundNum = Number(data.roundNum);
	let gameId = data.gameId;

	let round = gameData?.rounds[roundNum - 1];
	let roundType = round.type;

	let buzzersActive = false;
	let dailyDoubleOpen = false;
	let dailyDoubleWager: number | undefined;
	let buzzerWinnerId = '';
	let startTimer = false;
	let timerLength = roundType === 'normal' ? 5 : 30;

	// Need to define this to prevent errors on page refresh.
	let players: Map<string, Player> = new Map();

	$: room = $roomStore as Room | undefined;

	$: if (buzzersActive) {
		startTimer = false;
	}

	$: if (room !== undefined) {
		players = new Map(room.state.players);
		room.state.listen('buzzerWinner', (winId: string) => {
			buzzerWinnerId = winId;
			if (winId !== '') {
				buzzersActive = false;
				startTimer = true;
			}
		});

		room.state.listen('players', (playerChange: any) => {
			players = new Map(playerChange);
		});
	}

	const goToNext = () => {
		if (gameData.rounds.length === roundNum) {
			goto(`/standings/${gameId}`);
		} else {
			goto(`/standings/${round.num}/${gameId}`);
		}
	};
</script>

<div id="container">
	{#if roundType == 'normal'}
		<BuzzersActiveLights bind:buzzersActive {dailyDoubleOpen} />
	{/if}
	<div id="timer-container">
		<Timer length={timerLength} bind:buzzersActive {startTimer} {roundType} />
	</div>
	<div id="board-container" style="height:{roundType == 'final' ? '97.5%' : '82.5%'}">
		<PlayBoard
			{round}
			bind:buzzerWinnerId
			bind:dailyDoubleOpen
			bind:dailyDoubleWager
			firstPlayer={(Array.from(players.keys()) ?? [''])[0]}
			on:goToNext={goToNext}
		/>
	</div>
	{#if roundType != 'final'}
		<div id="player-dock-container">
			<PlayerDock
				players={Array.from(players.values())}
				buzzerWinner={players.get(buzzerWinnerId)}
			/>
		</div>
	{/if}
</div>

<style>
	#container {
		width: 100%;
		height: 100%;
		background-color: var(--black);
	}

	#timer-container {
		width: 100%;
		height: 2.5%;
	}

	#board-container {
		width: 100%;
	}

	#player-dock-container {
		width: 100%;
		height: 15%;
	}
</style>
