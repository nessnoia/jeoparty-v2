<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameId = data.data._id;

	if (browser) {
		window.localStorage.setItem('game-data', JSON.stringify(data.data));
	}

	const startGame = () => {
		goto(`/round/1/${gameId}`);
	};
</script>

<h1>Jeoparty!</h1>

<h4>Join Code: INSERT CODE</h4>
<h5>Join at INSERT LINK</h5>

<button on:click={startGame}>Start Game</button>
