<script lang="ts">
	import GameCard from './GameCard.svelte';

	let gamesList: { title: string; id: number }[] = [
		{ title: 'Game 1', id: 1 },
		{ title: 'Game 2', id: 2 },
		{ title: 'Game 3', id: 3 }
	];
</script>

{#each gamesList as game}
	<GameCard gameTitle={game.title} gameId={game.id} />
{/each}
