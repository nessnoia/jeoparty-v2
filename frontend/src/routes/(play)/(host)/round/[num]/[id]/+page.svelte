<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import BuzzersActiveLights from '$lib/components/play/BuzzersActiveLights.svelte';
	import PlayBoard from '$lib/components/play/PlayBoard.svelte';
	import PlayerDock from '$lib/components/play/PlayerDock.svelte';
	import Timer from '$lib/components/play/Timer.svelte';
	import type { GameData } from '$lib/database-models/game-data';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameData = data.gameData?.data as GameData;
	let roundNum = Number(data.roundNum);
	let gameId = data.gameId;

	let buzzersActive = false;
	let buzzerWinnerId = '';
	let startTimer = false;

	let round = gameData?.rounds[roundNum - 1];

	let players: Map<string, Player> = new Map();
	let room = $roomStore as Room | undefined;

	$: if (buzzersActive) {
		startTimer = false;
	}

	const goToNext = () => {
		if (gameData.rounds.length === roundNum) {
			goto(`/standings/${gameId}`);
		} else {
			goto(`/standings/${round.num}/${gameId}`);
		}
	};

	if (room !== undefined) {
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
</script>

<BuzzersActiveLights bind:buzzersActive />
<Timer length={5} bind:buzzersActive {startTimer} />
<PlayBoard
	{round}
	bind:buzzerWinnerId
	firstPlayer={(Array.from(players.keys()) ?? [''])[0]}
	on:goToNext={goToNext}
/>
<PlayerDock players={Array.from(players.values())} buzzerWinner={players.get(buzzerWinnerId)} />
