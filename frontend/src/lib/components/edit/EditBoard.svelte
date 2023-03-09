<script lang="ts">
	import { getAddCategoryData, getAddClueData, getAddRoundData } from '$lib/defaults/edit';
	import type { GameData } from '$lib/database-models/game-data';
	import type { GameInfo } from '$lib/database-models/game-info';
	import { unsaved } from '$lib/unsaved';
	import EditCategory from './EditCategory.svelte';
	import EditClue from './EditClue.svelte';
	import DraggableDiv from './DraggableDiv.svelte';
	import {
		sortClues,
		type CategoryUpdater,
		type ClueUpdater,
		type RoundUpdater
	} from '$lib/update-models/game-data';

	// TODO: Focus on last used element after form submit
	export let gameInfo: GameInfo;
	export let gameData: GameData;

	let roundShownIdx: number = 0;
	let gameTitle: string = gameData.gameTitle ?? 'Untitled Game';

	let rounds: RoundUpdater[] = [];

	let clueDraggableDivs: DraggableDiv[] = [];
	let categoryDraggableDiv: DraggableDiv;

	for (let i = 0; i < gameData.rounds.length; i++) {
		let round = gameData.rounds[i];

		let roundUpdater = {
			roundIdx: i,
			num: round.num,
			title: round.title,
			type: round.type,
			categories: [] as CategoryUpdater[]
		};
		rounds.push(roundUpdater);

		let numCategories = round.categories.length;
		for (let j = 0; j < numCategories; j++) {
			let category = round.categories[j];

			let categoryUpdater = {
				roundIdx: i,
				categoryIdx: j,
				category: category.category,
				clues: [] as ClueUpdater[]
			};
			rounds[i].categories!.push(categoryUpdater);

			let numClues = category.clues.length;
			for (let k = 0; k < numClues; k++) {
				let clue = round.categories[j].clues[k];

				let clueUpdater = {
					roundIdx: i,
					categoryIdx: j,
					clueIdx: k,
					value: clue.value,
					clue: clue.clue,
					clueImage: clue.clueImage,
					answer: clue.answer,
					isDailyDouble: clue.isDailyDouble
				};

				rounds[i].categories![j].clues!.push(clueUpdater);
			}
		}
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
					round.title = rounds[roundIdx].title;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.rounds.push({ roundIdx: roundIdx, title: rounds[roundIdx].title });
			}
			return game;
		});
	};

	const addRound = () => {
		let nextRoundNum = rounds.length + 1;
		let newRoundData = getAddRoundData(nextRoundNum);
		unsaved.update((game) => {
			if (!game.rounds) {
				game.rounds = [];
			}
			game.rounds.push(newRoundData);
			return game;
		});
		rounds = [...rounds, newRoundData];
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
		rounds[roundIdx].categories = [...rounds[roundIdx].categories!, newCategoryData];
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
		rounds[roundIdx].categories![categoryIdx].clues = [
			...rounds[roundIdx].categories![categoryIdx].clues!,
			newClueData
		];
	};

	const updateClueValuesAfterDrop = (roundIdx: number, categoryIdx: number) => {
		const clues = rounds[roundIdx].categories![categoryIdx].clues!;
		const sortedClues: ClueUpdater[] = [];
		clues.forEach((val) => {
			sortedClues.push(Object.assign({}, val));
		});
		sortedClues.sort(sortClues);
		for (let idx in clues) {
			clues[idx].value = sortedClues[idx].value;
		}
	};

	// TODO: if database has issues, update this to write only the categories that get changed instead of the entire array
	const saveCategoryChangesAfterDrop = (
		categoryArray: CategoryUpdater[],
		startIdx: number,
		finishIdx: number
	) => {
		const categoryChanges: CategoryUpdater[] = [];

		const updateCategory = (i: number) => {
			let category = categoryArray[i];
			category.categoryIdx = i;
			for (let clue of category.clues || []) {
				clue.categoryIdx = i;
			}
			categoryChanges.push(category);
		};
		if (startIdx < finishIdx) {
			for (let i = startIdx; i <= finishIdx; i++) {
				updateCategory(i);
			}
		} else {
			for (let i = startIdx; i >= finishIdx; i--) {
				updateCategory(i);
			}
		}

		unsaved.update((game) => {
			if (!game.categories) game.categories = [];
			game.categories = [...game.categories, ...categoryChanges];
			return game;
		});
	};

	const saveClueChangesAfterDrop = (
		clueArray: ClueUpdater[],
		startIdx: number,
		finishIdx: number
	) => {
		const clueChanges: ClueUpdater[] = [];

		const updateClue = (i: number) => {
			let clue = clueArray[i];
			clue.clueIdx = i;
			clueChanges.push(clue);
		};

		if (startIdx < finishIdx) {
			for (let i = startIdx; i <= finishIdx; i++) {
				updateClue(i);
			}
		} else {
			for (let i = startIdx; i >= finishIdx; i--) {
				updateClue(i);
			}
		}
		unsaved.update((game) => {
			if (!game.clues) game.clues = [];
			game.clues = [...game.clues, ...clueChanges];
			return game;
		});
	};
</script>

<label for="game-title">Game Title</label>
<input type="text" id="game-title" bind:value={gameTitle} on:input={saveGameTitleUpdate} />

<!-- Render rounds -->
{#each rounds as round, roundIdx (`${round.roundIdx}`)}
	<button on:click={() => (roundShownIdx = roundIdx)}>{rounds[roundIdx].title}</button>

	{#if roundIdx == roundShownIdx}
		<label for="round-title">Round Title</label>
		<input
			type="text"
			id="round-title"
			bind:value={rounds[roundIdx].title}
			on:input={() => saveRoundTitleUpdate(roundIdx)}
		/>

		<!-- Render categories -->
		{#if round.type == 'normal'}
			{#each round.categories || [] as category, categoryIdx (`${category.roundIdx}.${category.categoryIdx}`)}
				<DraggableDiv
					bind:this={categoryDraggableDiv}
					bind:updateArray={round.categories}
					on:dragstart={(event) => {
						categoryDraggableDiv.dragStart(event, categoryIdx, category);
					}}
					on:drop={(event) => {
						event.preventDefault();
						categoryDraggableDiv.drop(event, categoryIdx, category, saveCategoryChangesAfterDrop);
					}}
				>
					<EditCategory bind:category />

					<!-- Render clues -->
					{#each category.clues || [] as clue, clueIdx (`${clue.roundIdx}.${clue.categoryIdx}.${clue.clueIdx}`)}
						<DraggableDiv
							bind:this={clueDraggableDivs[categoryIdx]}
							bind:updateArray={category.clues}
							on:dragstart={(event) => {
								clueDraggableDivs[categoryIdx].dragStart(event, clueIdx, clue);
							}}
							on:drop={(event) => {
								event.preventDefault();
								clueDraggableDivs[categoryIdx].drop(event, clueIdx, clue, saveClueChangesAfterDrop);
								updateClueValuesAfterDrop(roundIdx, categoryIdx);
							}}
						>
							<EditClue bind:clue bind:shownClue />
						</DraggableDiv>
					{/each}
				</DraggableDiv>
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
			<!-- Should only ever be on of each, but need to loop because of the possibly undefined arrays -->
			{#each round.categories || [] as category}
				<EditCategory {category} />
				{#each category.clues || [] as clue}
					<EditClue {clue} type="final" />
				{/each}
			{/each}
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
