<script lang="ts">
	import { hostClient } from '$lib/colyseus-client';
	import BuzzersActiveLights from '$lib/components/play/BuzzersActiveLights.svelte';
	import PlayBoard from '$lib/components/play/PlayBoard.svelte';
	import PlayerDock from '$lib/components/play/PlayerDock.svelte';
	import type { Round } from '$lib/database-models/game-data';
	import type { Player } from '$lib/player';
	import type { PageData } from './$types';

	export let data: PageData;

	let round = data as Round;
	let playerList: Player[] = [];

	hostClient.subscribe((room: any) => {
		room.state.players.$items.forEach((player: any) => {
			let playerObj = {
				name: player.name,
				character: player.character,
				characterColour: player.colour,
				score: player.score
			};
			playerList.push(playerObj);
		});
	});
</script>

<BuzzersActiveLights />
<PlayBoard {round} />
<BuzzersActiveLights />
<PlayerDock players={playerList} buzzWinner={undefined} />
