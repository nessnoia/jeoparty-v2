<script lang="ts">
	import { getAddCategoryData, getAddClueData, getAddRoundData } from '$lib/defaults/edit';
	import type { GameData } from '$lib/database-models/game-data';
	import type { GameInfo } from '$lib/database-models/game-info';
	import { unsaved } from '$lib/unsaved';
	import EditCategory from './EditCategory.svelte';
	import EditClue from './EditClue.svelte';

	// TODO: Focus on last used element after form submit
	export let gameInfo: GameInfo;
	export let gameData: GameData;

	let roundShownIdx: number = 0;
	let gameTitle: string = gameData.gameTitle ?? 'Untitled Game';

	let roundTitles: string[] = [];
	for (let round of gameData.rounds) {
		roundTitles.push(round.title);
	}

	let shownClue:
		| {
				round?: number;
				category?: number;
				clue?: number;
		  }
		| undefined;

	const saveGameTitleUpdate = () => {
		unsaved.update((game) => {
			game.gameTitle = gameTitle;
			return game;
		});
	};

	const saveRoundTitleUpdate = (roundIdx: number) => {
		unsaved.update((game) => {
			if (!game.rounds) {
				game.rounds = [];
			}
			let priorEdit = false;
			for (let round of game.rounds) {
				if (round.roundIdx === roundIdx) {
					round.title = roundTitles[roundIdx];
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.rounds.push({ roundIdx: roundIdx, title: roundTitles[roundIdx] });
			}
			return game;
		});
	};

	const addRound = () => {
		let nextRoundNum = gameData.rounds.length + 1;
		let newRoundData = getAddRoundData(nextRoundNum);
		unsaved.update((game) => {
			if (!game.rounds) {
				game.rounds = [];
			}
			game.rounds.push(newRoundData);
			return game;
		});
		gameData.rounds = [...gameData.rounds, newRoundData];
		roundTitles.push('Round ' + nextRoundNum);
	};

	const addCategory = (roundIdx: number) => {
		let newCategoryData = getAddCategoryData(roundIdx);
		unsaved.update((game) => {
			if (!game.categories) {
				game.categories = [];
			}
			game.categories.push(newCategoryData);
			return game;
		});
		gameData.rounds[roundIdx].categories = [
			...gameData.rounds[roundIdx].categories,
			newCategoryData
		];
	};

	const addClue = (roundIdx: number, categoryIdx: number) => {
		let newClueData = getAddClueData(roundIdx, categoryIdx);
		unsaved.update((game) => {
			if (!game.clues) {
				game.clues = [];
			}
			game.clues.push(newClueData);
			return game;
		});
		gameData.rounds[roundIdx].categories[categoryIdx].clues = [
			...gameData.rounds[roundIdx].categories[categoryIdx].clues,
			newClueData
		];
	};
</script>

<label for="game-title">Game Title</label>
<input type="text" id="game-title" bind:value={gameTitle} on:input={saveGameTitleUpdate} />
<!-- Render rounds -->
{#each gameData.rounds as round, roundIdx}
	<button on:click={() => (roundShownIdx = round.num - 1)}>{roundTitles[roundIdx]}</button>

	{#if roundIdx == roundShownIdx}
		<label for="round-title">Round Title</label>
		<input
			type="text"
			id="round-title"
			bind:value={roundTitles[roundIdx]}
			on:input={() => saveRoundTitleUpdate(roundIdx)}
		/>

		<!-- Render categories -->
		{#if round.type == 'normal'}
			{#each round.categories as category, categoryIdx}
				<EditCategory {category} {categoryIdx} {roundIdx} />
				<!-- Render clues -->
				{#each category.clues as clue, clueIdx}
					<EditClue {clue} {roundIdx} {categoryIdx} {clueIdx} bind:shownClue />
				{/each}
				{#if gameInfo.boardType == 'custom'}
					<button
						on:click={() => {
							addClue(roundShownIdx, categoryIdx);
						}}
						><img src="/icons/circle-plus.svg" alt="add category" />
					</button>
				{/if}
			{/each}
		{:else if round.type == 'final'}
			<EditCategory category={round.categories[0]} categoryIdx={0} {roundIdx} />
			<EditClue clue={round.categories[0].clues[0]} {roundIdx} categoryIdx={0} clueIdx={0} />
		{/if}
		{#if gameInfo.boardType == 'custom' && round.type == 'normal'}
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
