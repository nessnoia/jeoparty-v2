<script lang="ts">
	import type { GameInfo } from '$lib/models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];
</script>

{#each gamesList as game}
	<!-- TODO: Instead of filtering after query, we should probably filter at the database query level. -->
	<!-- {#if String(game.ownedBy) === user?.uid} -->
	<GameCard gameInfo={game} />
	<!-- {/if} -->
{/each}
