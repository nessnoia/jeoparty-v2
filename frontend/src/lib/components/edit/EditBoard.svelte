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
	import AddRoundModal from '../modals/AddRoundModal.svelte';

	// TODO: Focus on last used element after form submit
	export let gameInfo: GameInfo;
	export let gameData: GameData;

	let roundShownIdx: number = 0;
	let gameTitle: string = gameData.gameTitle ?? 'Untitled Game';

	let rounds: RoundUpdater[] = [];

	let clueDraggableDivs: DraggableDiv[] = [];
	let categoryDraggableDiv: DraggableDiv;

	let addRoundVisible = false;

	let shownClue:
		| {
				round?: number;
				category?: number;
				clue?: number;
		  }
		| undefined;

	// Fill RoundUpdater array with gameData so we're not trying to update the prop (won't update UI)
	for (let i = 0; i < gameData.rounds.length; i++) {
		let round = gameData.rounds[i];

		let roundUpdater = {
			roundIdx: i,
			num: round.num,
			title: round.title,
			maxDailyDoubles: round.maxDailyDoubles,
			type: round.type,
			categories: [] as CategoryUpdater[]
		};
		rounds.push(roundUpdater);

		let numCategories = round.categories.length;
		let numDailyDoubles = 0;
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

				if (clue.isDailyDouble) {
					numDailyDoubles += 1;
				}

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
		rounds[i].numDailyDoubles = numDailyDoubles;
	}

	const saveGameTitleUpdate = () => {
		unsaved.update((game) => {
			game.gameTitle = gameTitle;
			return game;
		});
	};

	const saveRoundUpdate = (roundIdx: number, field: keyof RoundUpdater, value: any) => {
		unsaved.update((game) => {
			if (!game.rounds) game.rounds = [];
			let priorEdit = false;
			for (let round of game.rounds) {
				if (round.roundIdx === roundIdx) {
					round[field] = value;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.rounds.push({ roundIdx: roundIdx });
				game.rounds[game.rounds.length - 1][field] = value;
			}
			return game;
		});
	};

	const addCategory = (roundIdx: number) => {
		let newCategoryData = getAddCategoryData(roundIdx);
		unsaved.update((game) => {
			if (!game.categories) game.categories = [];
			game.categories.push(newCategoryData);
			return game;
		});
		newCategoryData.categoryIdx = rounds[roundIdx].categories?.length;
		rounds[roundIdx].categories = [...rounds[roundIdx].categories!, newCategoryData];
	};

	const addClue = (roundIdx: number, categoryIdx: number) => {
		let newClueData = getAddClueData(roundIdx, categoryIdx);
		unsaved.update((game) => {
			if (!game.clues) game.clues = [];
			game.clues.push(newClueData);
			return game;
		});
		newClueData.clueIdx = rounds[roundIdx].categories![categoryIdx].clues?.length;
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
			on:input={() => saveRoundUpdate(roundIdx, 'title', rounds[roundIdx].title)}
		/>

		<!-- Render categories -->
		{#if round.type == 'normal'}
			{#if gameInfo.boardType == 'standard'}
				<!-- TODO: make 's' reactive based on the number -->
				<p>
					You have {(round.maxDailyDoubles || 0) - (round.numDailyDoubles || 0)} Daily Double(s) left
					for this round.
				</p>
			{:else if gameInfo.boardType == 'custom'}
				<p>
					You have {round.numDailyDoubles || 0} Daily Double(s) on this round.
				</p>
			{/if}
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
								if (gameInfo.boardType == 'standard') {
									updateClueValuesAfterDrop(roundIdx, categoryIdx);
								}
							}}
						>
							<EditClue
								on:updateDailyDoubleNumber={(event) => {
									if (round.numDailyDoubles !== undefined) {
										round.numDailyDoubles += event.detail.add;
										saveRoundUpdate(roundIdx, 'numDailyDoubles', round.numDailyDoubles + 1);
									}
								}}
								bind:clue
								bind:shownClue
								roundType={round.type}
								boardType={gameInfo.boardType}
								maxDailyDoublesReached={(round.maxDailyDoubles || -1) -
									(round.numDailyDoubles || 0) ==
									0}
							/>
						</DraggableDiv>
					{/each}
				</DraggableDiv>
				{#if gameInfo.boardType == 'custom' && round.type == 'normal' && (category.clues || []).length < 10}
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
					<EditClue {clue} roundType={round.type} boardType={gameInfo.boardType} />
				{/each}
			{/each}
		{/if}
		{#if gameInfo.boardType == 'custom'}
			{#if rounds.length < 5}
				<button
					on:click={() => {
						addRoundVisible = true;
					}}
					><img src="/icons/circle-plus.svg" alt="add round" />
				</button>
				<AddRoundModal
					on:changeRound={(event) => (roundShownIdx = event.detail.showRoundIdx)}
					bind:isVisible={addRoundVisible}
					bind:rounds
				/>
			{/if}
			{#if round.type == 'normal' && (round.categories || []).length < 8}
				<button
					on:click={() => {
						addCategory(roundShownIdx);
					}}
					><img src="/icons/circle-plus.svg" alt="add clue" />
				</button>
			{/if}
		{/if}
	{/if}
{/each}
