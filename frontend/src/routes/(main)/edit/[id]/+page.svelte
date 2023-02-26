<script lang="ts">
	import { getAddRoundData, getAddCategoryData, getAddClueData } from '$lib/defaults/edit';
	import type { GameData } from '$lib/models/game-data';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameData = data.gameData;
	let games = data.games;
	console.log(gameData);

	let roundShownIdx: number = 0;
	let gameTitle: string = gameData.gameTitle;

	function addRound() {
		let nextRoundNum = gameData.rounds.length + 1;
		gameData.rounds = [...gameData.rounds, getAddRoundData(nextRoundNum)];
	}

	function addCategory(roundIdx: number) {
		gameData.rounds[roundIdx].categories = [
			...gameData.rounds[roundIdx].categories,
			getAddCategoryData()
		];
	}

	function addClue(roundIdx: number, categoryIdx: number) {
		gameData.rounds[roundIdx].categories[categoryIdx].clues = [
			...gameData.rounds[roundIdx].categories[categoryIdx].clues,
			getAddClueData()
		];
	}
</script>

<label for="game-title">{gameTitle}</label>
<input type="text" id="game-title" bind:value={gameData.gameTitle} />
<!-- Render rounds -->
{#each gameData.rounds as round, roundIdx}
	<button on:click={() => (roundShownIdx = round.num - 1)}>{round.title}</button>

	{#if roundIdx == roundShownIdx}
		<label for="round-title">Round Title</label>
		<input type="text" id="round-title" bind:value={round.title} />

		<!-- Render categories -->
		{#if round.type == 'normal'}
			{#each round.categories as category, categoryIdx}
				<button>{category.category}</button>
				<!-- Render clues -->
				{#each category.clues as clue}
					<button>{clue.clue}</button>
				{/each}
				{#if games.boardType == 'custom'}
					<button
						on:click={() => {
							addClue(roundShownIdx, categoryIdx);
						}}
						><img src="/icons/circle-plus.svg" alt="add category" />
					</button>
				{/if}
			{/each}
		{:else if round.type == 'final'}
			<button>{round.category}</button>
		{/if}
		{#if games.boardType == 'custom' && round.type == 'normal'}
			<button
				on:click={() => {
					addRound();
				}}
				><img src="/icons/circle-plus.svg" alt="add round" />
			</button>
			<button
				on:click={() => {
					addCategory(roundShownIdx);
				}}
				><img src="/icons/circle-plus.svg" alt="add clue" />
			</button>
		{/if}
	{/if}
{/each}

<style>
	img {
		height: 20px;
		width: auto;
	}
</style>
