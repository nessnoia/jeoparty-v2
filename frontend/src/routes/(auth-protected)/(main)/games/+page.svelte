<script lang="ts">
	import { goto } from '$app/navigation';
	import GamesTable from '$lib/components/game-select/GamesTable.svelte';
	import GameDelete from '$lib/components/game-select/GameDelete.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let games = data.data;

	const goToCreatePage = () => {
		goto('/create');
	};
</script>

<div id="container">
	<div id="header-and-controls">
		<h1>Your Games</h1>

		<div id="game-add-controls">
			<GameDelete bind:games />
			<!--	<button on:click={goToCreatePage}
			><img src="/icons/circle-plus.svg" alt="add game" /></button
		>-->
			<button on:click={goToCreatePage} alt="create game">Create Game</button>
		</div>
	</div>

	<!-- <input id="search" type="text" placeholder="Search for games" /> -->

	<!-- TODO: Add filtering functionality -->
	<!-- <div>
	<span>Filter by:</span>
	<button>Tags</button>
	<button># of Rounds</button>
	<button># of Questions</button>
</div> -->

	<GamesTable gamesList={games} />
</div>

<style>
	#container {
		padding: 100px var(--gutter-size-other) 0 var(--gutter-size-other);
		display: flex;
		flex-direction: column;
		align-content: center;
		min-height: 92vh;
		gap: 30px;
	}

	#header-and-controls {
		display: flex;
		gap: 2%;
		justify-content: center;
		align-items: center;
		padding: 10px 0;
		width: 100%;
	}

	#header-and-controls h1 {
		margin: 0;
		flex-grow: 2;
		text-align: center;
	}

	#game-add-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10%;
	}

	#game-add-controls button {
		flex-grow: 2;
		white-space: nowrap;
		background-color: transparent;
		border: 0px;
		padding: 4% 2%;
		font-size: var(--size-9);
		border: 3px solid var(--black);
		color: var(--black);
	}

	#game-add-controls button:hover {
		cursor: pointer;
	}

	/* #search {
		background: url('/icons/magnifying-glass.svg') no-repeat scroll 5px;
		background-size: 20px;
		padding: 8px;
		padding-left: 40px;
		box-shadow: none;
		outline: none;
		border: 1px solid var(--black);
	}

	#search:focus {
		box-shadow: none;
		outline: none;
		border: 1px solid var(--grey-200);
	} */
	@media only screen and (max-width: 600px) {
		#header-and-controls {
			flex-direction: column;
			gap: 20px;
		}

		#game-add-controls {
			width: 100%;
			gap: 80px;
			padding: 0 7%;
		}

		#game-add-controls button {
			float: right;
			white-space: wrap;
		}
	}
</style>
