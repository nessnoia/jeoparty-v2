<script lang="ts">
	import type { Player } from '$lib/player';
	import PlayerScore from './PlayerScore.svelte';

	export let players: Player[];
	export let buzzerWinner: Player | undefined;
</script>

<div id="player-dock">
	<div id="top-three-players">
		{#each players as player, i}
			{#if i < 3}
				<PlayerScore
					--border-style="1px solid var(--grey-100)"
					name={player.name}
					score={player.score}
				/>
			{/if}
		{/each}
	</div>

	<div id="buzzer-winner">
		{#if buzzerWinner}
			<PlayerScore
				--border-style="6px solid var(--tertiary-500)"
				name={buzzerWinner.name}
				score={buzzerWinner.score}
			/>
		{:else}
			<div id="buzzer-winner-placeholder" />
		{/if}
	</div>
</div>

<style>
	#player-dock {
		display: flex;
		justify-content: space-between;
		padding: 0.2% 5% 2% 5%;
		width: 100%;
		height: 100%;
	}

	#top-three-players {
		display: flex;
		justify-content: space-between;
		width: 60%;
		gap: 5%;
	}

	#buzzer-winner {
		width: 20%;
		height: 100%;
	}

	#buzzer-winner-placeholder {
		background-color: var(--grey-800);
		border: 5px var(--grey-900) outset;
		height: 100%;
	}
</style>
