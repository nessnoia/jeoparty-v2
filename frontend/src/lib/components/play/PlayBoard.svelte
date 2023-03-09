<script lang="ts">
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';

	export let round: Round;
</script>

<!-- Render categories -->
{#if round.type == 'normal'}
	{#each round.categories as category}
		<PlayCategory {category} />
		<!-- Render clues -->
		{#each category.clues.sort(sortClues) as clue}
			<PlayClue {clue} />
		{/each}
	{/each}
{:else if round.type == 'final'}
	<!--This div will be an empty space until the category is revealed-->
	<div />
{/if}
