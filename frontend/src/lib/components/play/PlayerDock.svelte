<script lang="ts">
	import type { Player } from '$lib/player';
	import PlayerScore from './PlayerScore.svelte';

	export let players: Player[];
	export let buzzWinner: Player | undefined;

	players.sort((p1, p2) => (p1.score > p2.score ? -1 : 1));
</script>

{#each players as player, i}
	{#if i < 3}
		<PlayerScore name={player.name} score={player.score} />
	{/if}
{/each}

{#if buzzWinner}
	<PlayerScore name={buzzWinner.name} score={buzzWinner.score} />
{:else}
	<div />
{/if}
