<script lang="ts">
	import type { Player } from '$lib/player';
	import { characters } from '$lib/selector-maps';

	export let topThree: Player[];
	export let buzzWinner: Player | undefined;
</script>

{#each topThree as player}
	<div>
		<svelte:component this={characters[player.character]} colourChoice={player.characterColour} />
	</div>
	<div><p>${player.score}</p></div>
	<div><p>{player.name}</p></div>
{/each}

{#if buzzWinner}
	<div>
		<svelte:component
			this={characters[buzzWinner.character]}
			colourChoice={buzzWinner.characterColour}
		/>
	</div>
	<div><p>${buzzWinner.score}</p></div>
	<div><p>{buzzWinner.name}</p></div>
{:else}
	<div />
{/if}
