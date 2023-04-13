<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';
	import ShowCategories from './ShowCategories.svelte';

	export let round: Round;

	let showCategories = true;
	let dispatch = createEventDispatcher();

	let numClues = 0;
	for (let category of round.categories) {
		for (let _ of category.clues) {
			numClues++;
		}
	}

	let numCluesPlayed = 0;

	$: if (numClues === numCluesPlayed) {
		dispatch('goToNext');
	}

	$: roomStore.subscribe((room: any) => {
		if (room) {
			if (showCategories) {
				room.send('updateGameState', {
					state: 'showCategories'
				});
			} else {
				room.send('updateGameState', {
					state: 'buzzer'
				});
			}
		}
	});
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
				<PlayClue {clue} on:clueUsed={() => numCluesPlayed++} />
			{/each}
		{/each}
	{/if}
{:else if round.type == 'final'}
	<!--This div will be an empty space until the category is revealed-->
	<div />
{/if}
