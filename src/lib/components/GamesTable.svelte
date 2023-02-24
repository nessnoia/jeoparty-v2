<script lang="ts">
	import type { GameInfo } from '$lib/models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];
</script>

{#each gamesList as game}
	<GameCard gameTitle={game.gameTitle} gameId={Number(game._id)} />
{/each}
