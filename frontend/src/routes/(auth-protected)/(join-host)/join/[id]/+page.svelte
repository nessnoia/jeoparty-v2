<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { PageData } from './$types';
	import * as Colyseus from 'colyseus.js';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import PlayerDetailed from '$lib/components/play/PlayerDetailed.svelte';
	import { roomStore } from '$lib/colyseus-client';
	import { Circle3 } from 'svelte-loading-spinners';

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
			room.send('updateGameState', { state: 'join' });
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
			<p>Waiting for players to join...</p>
			<Circle3
				size="40"
				ballTopLeft="#000000"
				ballTopRight="red"
				ballBottomLeft="blue"
				ballBottomRight="green"
				unit="px"
				duration="2s"
			/>
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
	{#if Object.keys(playerList).length >= 3}
		<button id="start" on:click={startGame}>Start Game</button>
	{/if}
</div>

<style>
	#container {
		width: 100%;
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
	}

	#waiting-message {
		margin-top: calc(150px + 5em);
		font-size: var(--size-6);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
		background-color: white;
	}

	#logo {
		height: auto;
		max-height: 150px;
		min-height: 120px;
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
		background-color: var(--black);
		color: var(--white);
		border: none;
		border-radius: 0.3em;
		outline: none;
		font-size: var(--size-7);
		padding: 0.7em 1.5em;
	}

	#start:hover {
		cursor: pointer;
	}
</style>