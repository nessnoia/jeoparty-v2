<script lang="ts">
	import { browser } from '$app/environment';
	import { roomStore } from '$lib/colyseus';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let player: Player;
	let sessionId = '';

	let numPlayers = 0;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		numPlayers = room.state.players.size;
		for (let [id, playerObj] of room.state.players) {
			if (sessionId === id) {
				player = playerObj;
				console.log(player);
				break;
			}
		}
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}
</script>

<div id="background">
	<h1>Thanks for playing!</h1>
	<h2>Final score: ${player?.score ?? ''}</h2>
	<!-- If a player finishes in the top half -->
	{#if player?.place < numPlayers / 2}
		<h2>Congratulations! Your final standing: #{player?.place ?? ''}</h2>
	{:else}
		<h2>Your final standing: #{player?.place ?? ''}. Better luck next time!</h2>
	{/if}
</div>

<style>
	#background {
		width: 100%;
		height: 100%;
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
		font-size: var(--size-4);
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		font-size: var(--size-6);
	}
</style>
