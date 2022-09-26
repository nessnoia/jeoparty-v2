<script>
	import GameCard from './GameCard.svelte';

	let gamesList = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6', 'Game 7', 'Game 8'];
</script>

{#each gamesList as game}
	<GameCard gameTitle={game} />
{/each}
