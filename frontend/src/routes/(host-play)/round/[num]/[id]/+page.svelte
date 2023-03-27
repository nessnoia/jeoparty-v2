<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { hostClient } from '$lib/colyseus-client';
	import BuzzersActiveLights from '$lib/components/play/BuzzersActiveLights.svelte';
	import PlayBoard from '$lib/components/play/PlayBoard.svelte';
	import PlayerDock from '$lib/components/play/PlayerDock.svelte';
	import Timer from '$lib/components/play/Timer.svelte';
	import type { GameData } from '$lib/database-models/game-data';
	import type { Player } from '$lib/player';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameData = data.gameData?.data as GameData;
	let roundNum = Number(data.roundNum);
	let gameId = data.gameId;

	let buzzersActive = false;

	let round = gameData?.rounds[roundNum - 1];

	let playerList: Player[] = [];

	const goToNext = () => {
		if (gameData.rounds.length === roundNum) {
			goto(`/standings/${gameId}`);
		} else {
			goto(`/standings/${round.num}/${gameId}`);
		}
	};

	hostClient.subscribe((room: any) => {
		// room.state.players.$items.forEach((player: any) => {
		// 	let playerObj = {
		// 		name: player.name,
		// 		character: player.character,
		// 		characterColour: player.colour,
		// 		score: player.score
		// 	};
		// 	playerList.push(playerObj);
		// });
	});
</script>

<BuzzersActiveLights bind:buzzersActive />
<Timer length={5} bind:buzzersActive />
<PlayBoard {round} on:goToNext={goToNext} />
<PlayerDock players={playerList} buzzWinner={undefined} />
