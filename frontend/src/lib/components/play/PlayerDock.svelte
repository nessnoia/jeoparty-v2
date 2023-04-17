<script lang="ts">
	import type { Player } from '$lib/player';
	import PlayerScore from './PlayerScore.svelte';

	export let players: Player[];
	export let buzzWinner: Player | undefined;
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
