<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];
</script>

{#each gamesList as game}
	<GameCard gameInfo={game} />
{/each}
