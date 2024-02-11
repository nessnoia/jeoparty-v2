<script lang="ts">
	import { roomStore,  states, events } from '$lib/colyseus';
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';
	import type { Room } from 'colyseus.js';
	import FinalJeopardyClue from './FinalJeopardyClue.svelte';
	import FinalJeopartyResponses from './FinalJeopartyResponses.svelte';
	import type { PlayerFinalJeoparty } from '$lib/player';

	export let round: Round;
	export let buzzerWinnerId: string;
	export let firstPlayer: string;
	export let dailyDoubleOpen: boolean;
	export let dailyDoubleWager: number | undefined;

	let secondMostRecentWinner = '';
	let mostRecentWinner = firstPlayer;

	let showCategories = round.type === 'normal';
	let showPlayerAnswers = false;
	let dailyDoubleWagerSubmitted = false;

	let finalJeopartyResponses: Map<string, PlayerFinalJeoparty> = new Map();
	let dispatch = createEventDispatcher();

	let numClues = 0;
	let maxRoundClueValue = 0;
	for (let category of round.categories) {
		for (let clue of category.clues) {
			numClues++;
			if ((clue.value ?? 0) > maxRoundClueValue) {
				maxRoundClueValue = clue.value ?? 0;
			}
		}
	}

	let numCluesPlayed = 0;
	let lastClueValue = 0;

	$: room = $roomStore as Room | undefined;

	$: if (numClues === numCluesPlayed) {
		dispatch('goToNext');
	}

	$: if (showCategories && round.type === 'normal') {
		room?.send(events.UpdateGameState, {
			state: states.ShowCategories
		});
	} else if (!showCategories && round.type === 'normal' && !dailyDoubleOpen) {
		room?.send(events.UpdateGameState, {
			state: states.Buzzer
		});
	}

	$: if (room !== undefined) {
		room.state.dailyDouble.onChange = (changes: any) => {
			for (let change of changes) {
				if (change.field == 'playerWager' && dailyDoubleOpen) {
					if (change.value !== -1) {
						lastClueValue = change.value;
						dailyDoubleWagerSubmitted = true;
						dailyDoubleWager = change.value;
					} else {
						dailyDoubleWager = undefined;
						dailyDoubleWagerSubmitted = false;
					}
				}
			}
		};

		room.state.finalJeoparty.onChange = () => {
			finalJeopartyResponses = new Map(room?.state.finalJeoparty);
			for (let [key, response] of finalJeopartyResponses) {
				let player = room?.state.players.get(key);
				response.name = player.name;
			}
		};
	}

	const onClueUsed = () => {
		room?.send(events.UpdateGameState, {
			state: states.Buzzer
		});
		numCluesPlayed++;
		dailyDoubleOpen = false;
		dailyDoubleWager = undefined;
		dailyDoubleWagerSubmitted = false;
	};

	const onClueOpened = (e: CustomEvent<{ value: number }>) => {
		room?.send(events.UpdateGameState, {
			state: states.ClueOpen
		});
		lastClueValue = e.detail.value;
		buzzerWinnerId = '';
	};

	const handleDailyDouble = () => {
		dailyDoubleOpen = true;
		room?.send(events.UpdateDailyDoubleInfo, {
			playerId: mostRecentWinner,
			clueValue: maxRoundClueValue
		});
		room?.send(events.UpdateGameState, {
			state: states.DailyDouble
		});
		buzzerWinnerId = mostRecentWinner;
	};

	const onAllAnswersShown = (clueAnswer: string) => {
		let clueAnswerBareBones = clueAnswer.toLowerCase().replace(/\s/g, '');
		for (let [id, response] of finalJeopartyResponses) {
			let playerAnswerBareBones = response.answer.toLowerCase().replace(/\s/g, '');
			let playerScoreUpdateValue = 0;
			if (clueAnswerBareBones === playerAnswerBareBones) {
				playerScoreUpdateValue = response.wager;
			} else {
				playerScoreUpdateValue = -response.wager;
			}
			room?.send(events.UpdatePlayerScore, {
				id: id,
				clueValue: playerScoreUpdateValue
			});
		}
		dispatch('goToNext');
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (buzzerWinnerId !== '') {
			if (key === 'ArrowUp' || key === '+' || key === 'w') {
				room?.send(events.UpdatePlayerScore, {
					id: buzzerWinnerId,
					clueValue: lastClueValue
				});
				secondMostRecentWinner = mostRecentWinner;
				mostRecentWinner = buzzerWinnerId;
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				room?.send(events.UpdatePlayerScore, {
					id: buzzerWinnerId,
					clueValue: -lastClueValue
				});
				mostRecentWinner = secondMostRecentWinner;
			}
		}
	};
</script>

<div id="board-flexbox">
	<div id="board">
		<!-- Render categories -->
		{#if round.type == 'normal'}
			<!-- {#if showCategories}
		<ShowCategories categories={round.categories} bind:showCategories />
	{:else} -->
			<div class="categories">
				{#each round.categories as category}
					<div class="clues">
						<PlayCategory {category} />
						<!-- Render clues -->
						{#each category.clues.sort(sortClues) as clue}
							<PlayClue
								{clue}
								{dailyDoubleWagerSubmitted}
								on:clueUsed={onClueUsed}
								on:clueOpened={onClueOpened}
								on:dailyDouble={handleDailyDouble}
							/>
						{/each}
					</div>
				{/each}
			</div>
			<!-- {/if} -->
		{:else if round.type == 'final'}
			<!-- Should only ever be one of each, but need to loop because of the possibly undefined arrays -->
			{#each round.categories || [] as category}
				{#each category.clues || [] as clue}
					{#if showPlayerAnswers}
						<FinalJeopartyResponses
							{clue}
							responses={Array.from(finalJeopartyResponses.values())}
							on:allAnswersShown={() => onAllAnswersShown(clue.answer)}
						/>
					{:else}
						<FinalJeopardyClue
							{category}
							{clue}
							responses={finalJeopartyResponses}
							on:showPlayerAnswers={() => (showPlayerAnswers = true)}
						/>
					{/if}
				{/each}
			{/each}
		{/if}
	</div>
</div>

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	#board-flexbox {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#board {
		box-sizing: border-box;
		height: 90%;
		width: 90%;
		min-width: 1300px;
	}

	.categories {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		height: 100%;
		gap: 0.4em;
	}

	.clues {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		gap: 0.4em;
	}
</style>
