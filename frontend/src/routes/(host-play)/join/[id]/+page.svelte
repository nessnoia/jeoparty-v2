<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import * as Colyseus from 'colyseus.js';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';

	export let data: PageData;

	let gameId = data.game.data._id;
	let gameCode = data.code.code;

	if (browser) {
		let colyseus = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		window.localStorage.setItem('game-data', JSON.stringify(data.game.data));
		colyseus.create('jeoparty', { gameCode });
	}

	const startGame = () => {
		goto(`/round/1/${gameId}`);
	};
</script>

<h1>Jeoparty!</h1>

<h4>Join Code: {gameCode}</h4>
<h5>Join at INSERT LINK</h5>

<button on:click={startGame}>Start Game</button>
