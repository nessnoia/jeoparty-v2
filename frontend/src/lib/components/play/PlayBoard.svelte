<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';
	import ShowCategories from './ShowCategories.svelte';
	import type { Room } from 'colyseus.js';
	import { browser } from '$app/environment';

	export let round: Round;
	export let buzzerWinnerId: string;
	export let firstPlayer: string;

	let secondMostRecentWinner = '';
	let mostRecentWinner = firstPlayer;

	// host knows who the last winner was: when the up arrow is hit, the last winner field gets updated
	// when the down arrow is hit, this gets reverted to the previous winner
	// then, when a daily double is found:
	//  the client redirects the character who was the last winner to the daily double screen
	//  the host updates the daily double clue value and who the daily double should be assigned to
	//  the client submits their wager and updates the clue based on that

	let room = $roomStore as Room | undefined;

	let showCategories = true;
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

	$: if (numClues === numCluesPlayed) {
		dispatch('goToNext');
	}

	$: if (showCategories) {
		room?.send('updateGameState', {
			state: 'showCategories'
		});
	} else {
		room?.send('updateGameState', {
			state: 'buzzer'
		});
	}

	if (browser) {
		if (room !== undefined) {
			room.state.dailyDouble.onChange = function (changes: any) {
				for (let change of changes) {
					if (change.field == 'playerWager') {
						lastClueValue = change.value;
					}
				}
			};
		}
	}

	const clueClosed = () => {
		room?.send('updateGameState', {
			state: 'buzzer'
		});
		numCluesPlayed++;
	};

	const clueOpen = (e: CustomEvent<{ value: number }>) => {
		room?.send('updateGameState', {
			state: 'clueOpen'
		});
		lastClueValue = e.detail.value;
		buzzerWinnerId = '';
	};

	const handleDailyDouble = () => {
		room?.send('updateDailyDoubleInfo', {
			playerId: mostRecentWinner,
			clueValue: maxRoundClueValue
		});
		room?.send('updateGameState', {
			state: 'dailyDouble'
		});
		buzzerWinnerId = mostRecentWinner;
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (buzzerWinnerId !== '') {
			if (key === 'ArrowUp' || key === '+' || key === 'w') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: lastClueValue
				});
				secondMostRecentWinner = mostRecentWinner;
				mostRecentWinner = buzzerWinnerId;
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: -lastClueValue
				});
				mostRecentWinner = secondMostRecentWinner;
			}
		}
	};
</script>

<!-- Render categories -->
{#if round.type == 'normal'}
	{#if showCategories}
		<ShowCategories categories={round.categories} bind:showCategories />
	{:else}
		{#each round.categories as category}
			<PlayCategory {category} />
			<!-- Render clues -->
			{#each category.clues.sort(sortClues) as clue}
				<PlayClue
					{clue}
					on:clueUsed={clueClosed}
					on:clueOpen={clueOpen}
					on:dailyDouble={handleDailyDouble}
				/>
			{/each}
		{/each}
	{/if}
{:else if round.type == 'final'}
	<!--This div will be an empty space until the category is revealed-->
	<div />
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />
