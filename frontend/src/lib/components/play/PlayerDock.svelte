<script lang="ts">
	import type { Player } from '$lib/player';
	import PlayerScore from './PlayerScore.svelte';

	export let players: Player[];
	export let buzzerWinner: Player | undefined;
</script>

<div id="player-dock">
	{#each players as player, i}
		{#if i < 3}
			<PlayerScore name={player.name} score={player.score} />
		{/if}
	{/each}

	{#if buzzerWinner}
		<PlayerScore name={buzzerWinner.name} score={buzzerWinner.score} />
	{:else}
		<div />
	{/if}
</div>

<style>
	#player-dock {
		border: 1px solid black;
		height: 100%;
		margin-bottom: 1%;
	}
</style>
