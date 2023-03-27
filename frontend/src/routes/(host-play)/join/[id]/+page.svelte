<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import * as Colyseus from 'colyseus.js';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import PlayerDetailed from '$lib/components/play/PlayerDetailed.svelte';
	import { hostClient } from '$lib/colyseus-client';

	export let data: PageData;

	let gameId = data.game.data._id;
	let gameCode = data.code.code;

	let playerList: Record<any, any> = {};

	if (browser) {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		window.localStorage.setItem('game-data', JSON.stringify(data.game.data));
		client.create('jeoparty', { gameCode }).then((room) => {
			hostClient.set(room);
			room.onStateChange((state) => {
				(state as any).players.onAdd = (player: any, key: any) => {
					playerList[key] = player;
				};
			});
		});
	}

	const startGame = () => {
		goto(`/round/1/${gameId}`);
	};
</script>

<h1>Jeoparty!</h1>

<h4>Join Code: {gameCode}</h4>
<h5>Join at INSERT LINK</h5>

{#each Object.values(playerList) as player}
	<PlayerDetailed
		name={player.name}
		character={player.character}
		colour={player.colour}
		score={0}
	/>
{/each}

{#if Object.keys(playerList).length > 0}
	<button on:click={startGame}>Start Game</button>
{/if}
