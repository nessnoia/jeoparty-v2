<script lang="ts">
	import { roomStore } from '$lib/colyseus';
	import Podium from '$lib/components/play/host/Podium.svelte';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Player[] = [];

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.players.$items.forEach((player: any) => {
			let playerObj = {
				name: player.name,
				character: player.character,
				characterColour: player.colour,
				score: player.score,
				place: -1
			};
			playerList.push(playerObj);
		});
	}
</script>

<div id="podium-container">
	{#each playerList as player, i}
		{#if i < 5}
			<Podium
				character={player.character}
				colourChoice={player.characterColour}
				name={player.name}
				score={player.score}
				standing={i + 1}
				numPlayers={playerList.length >= 5 ? 5 : playerList.length}
			/>
		{/if}
	{/each}
</div>

<style>
	#podium-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 80%;
		height: 80%;
	}
</style>
