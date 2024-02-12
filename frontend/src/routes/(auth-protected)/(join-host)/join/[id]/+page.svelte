<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { PageData } from './$types';
	import * as Colyseus from 'colyseus.js';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import PlayerDetailed from '$lib/components/play/host/PlayerDetailed.svelte';
	import { roomStore, states, events } from '$lib/colyseus';
	import Waiting from '$lib/components/play/Waiting.svelte';

	export let data: PageData;

	let gameId = data.gameId;
	let gameCode = data.code.code;

	let playerList: Record<any, any> = {};

	if (browser) {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		client.create('jeoparty', { gameCode }).then((room) => {
			roomStore.set(room);
			sessionStorage.setItem('roomId', room.id);
			sessionStorage.setItem('sessionId', room.sessionId);
			room.onStateChange((state) => {
				(state as any).players.onAdd = (player: any, key: any) => {
					playerList[key] = player;
				};
				(state as any).players.onRemove = (_: any, key: any) => {
					delete playerList[key];
					playerList = playerList;
				};
			});
			// For some reason it seems to default to the last game state, so this is to make sure it starts fresh.
			room.send(events.UpdateGameState, { state: states.Join });
		});
	}

	const startGame = () => {
		goto(`/round/1/${gameId}`);
	};
</script>

<div id="container">
	<div id="header-info">
		<img id="logo" src="/logo.png" alt="logo" />

		<div id="join">
			<span id="join-code-label">Join Code</span>
			<span id="code">{gameCode}</span>
			<span id="join-link">Join at <b>jeoparty.net/join</b></span>
		</div>
	</div>

	{#if Object.keys(playerList).length === 0}
		<div id="waiting-message">
			<Waiting size={100} invert={true}>
				<p>Waiting for players to join...</p>
			</Waiting>
		</div>
	{:else}
		<div id="players">
			{#each Object.values(playerList) as player}
				<PlayerDetailed
					name={player.name}
					character={player.character}
					colour={player.colour}
					score={0}
				/>
			{/each}
		</div>
	{/if}
</div>
<div id="button-centre">
	{#if Object.keys(playerList).length >= 0}
		<button id="start" on:click={startGame}>Start Game</button>
	{/if}
</div>

<style>
	#container {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
	}

	#waiting-message {
		margin-top: calc(150px + 5em);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#waiting-message p {
		font-size: var(--size-5);
		margin-top: 5%;
		margin-bottom: 5%;
	}

	#header-info {
		padding: 1.5em 0;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		gap: 2em;
		position: fixed;
		width: 100%;
	}

	#logo {
		height: auto;
		max-height: 150px;
		min-height: 120px;
		filter: brightness(0) saturate(100%) invert(15%) sepia(69%) saturate(4444%)
			hue-rotate(245deg) brightness(78%) contrast(116%);
	}

	#join-code-label {
		font-size: var(--size-7);
	}

	#join {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5em;
	}

	#code {
		border: 2px solid var(--black);
		border-radius: 0.3em;
		padding: 0.5em 1em;
		font-weight: bold;
		font-size: var(--size-5);
	}

	#join-link {
		font-size: var(--size-7);
	}

	#players {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		align-content: space-around;
		flex-wrap: wrap;
		flex-grow: 1;
		padding: 3% 2% 10% 2%;
		gap: 2em;
		margin: calc(150px + 3em) 0;
	}

	#button-centre {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 20px;
		width: 100%;
	}

	#start {
		margin: 1.5em auto;
		padding: 1em 1.5em;
		width: 18%;
	}

	#start:hover {
		cursor: pointer;
	}
</style>
