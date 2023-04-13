<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Podium from '$lib/components/play/Podium.svelte';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Player[] = [];

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
	}

	roomStore.subscribe((room: any) => {
		if (room) {
			room.state.players.$items.forEach((player: any) => {
				let playerObj = {
					name: player.name,
					character: player.character,
					characterColour: player.colour,
					score: player.score
				};
				playerList.push(playerObj);
			});
			playerList.sort((p1, p2) => (p1.score > p2.score ? -1 : 1));

			room.send('updateGameState', { state: 'podium' });
		}
	});
</script>

<div class="podium">
	{#each playerList as player, i}
		{#if i < 6}
			<Podium
				character={player.character}
				colourChoice={player.characterColour}
				name={player.name}
				score={player.score}
				standing={i + 1}
			/>
		{/if}
	{/each}
</div>

<style>
	.podium {
		display: flex;
	}
</style>
