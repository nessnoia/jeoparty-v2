<script lang="ts">
	import { roomStore } from '$lib/colyseus';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let sessionId = data.sessionId;

	let player: Player;
	let numPlayers = 0;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		numPlayers = room.state.players.size;
		for (let [id, playerObj] of room.state.players) {
			if (sessionId === id) {
				player = playerObj;
				break;
			}
		}
	}
</script>

<div id="container">
	<h1>Thanks for playing!</h1>
	<h3>Final score: ${player?.score ?? ''}</h3>
	<!-- If a player finishes in the top half -->
	{#if player?.place < numPlayers / 2}
		<h3>Congratulations! Your final standing: #{player?.place ?? ''}</h3>
	{:else}
		<h3>Your final standing: #{player?.place ?? ''}. Better luck next time!</h3>
	{/if}
</div>

<style>
	#container {
		color: var(--white);
		background-color: var(--black);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3%;
		padding: 0 8%;
	}

	h1 {
		margin: 0 0 15% 0;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
	}
</style>
