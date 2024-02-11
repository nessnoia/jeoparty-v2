<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];
</script>

<div id="games">
	{#each gamesList as game}
		<GameCard gameInfo={game} />
	{/each}
</div>

<style>
	#games {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px 10%;
		padding-top: 2%;
	}
</style>
