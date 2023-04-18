<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';
	import ShowCategories from './ShowCategories.svelte';
	import type { Room } from 'colyseus.js';

	export let round: Round;
	export let buzzerWinnerId: string;

	let room = $roomStore as Room | undefined;

	let showCategories = true;
	let dispatch = createEventDispatcher();

	let numClues = 0;
	for (let category of round.categories) {
		for (let _ of category.clues) {
			numClues++;
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

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (buzzerWinnerId !== '') {
			if (key === 'ArrowUp' || key === '+' || key === 'w') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: lastClueValue
				});
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: -lastClueValue
				});
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
				<PlayClue {clue} on:clueUsed={clueClosed} on:clueOpen={clueOpen} />
			{/each}
		{/each}
	{/if}
{:else if round.type == 'final'}
	<!--This div will be an empty space until the category is revealed-->
	<div />
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />
