<script lang="ts">
	import { characters } from '$lib/selector-maps';

	export let name: string;
	export let character: string;
	export let colour: number;
	export let score: number;

	let characterComponent = characters[character];
</script>

<div class="player">
	<div class="character">
		<svelte:component this={characterComponent} colourChoice={colour} />
	</div>
	<div class="podium">
		<p class="score">${score}</p>
		<p class="name">{name}</p>
	</div>
</div>

<style>
	.player {
		display: flex;
		flex-direction: column;
	}

	.character {
		max-height: 150px;
		max-width: 150px;
	}

	.podium {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 0.4em;
		margin-top: -20px;
		background-color: blue;
		border: 1px solid var(--black);
		padding: 0.5em;
		border-radius: 3px;
	}

	p {
		margin: 0;
	}

	.score {
		padding: 0.8em 1em;
	}

	.name {
		padding: 1.5em 1em;
	}

	.score,
	.name {
		border: 1px solid var(--black);
		background-color: var(--white);
		border-radius: 2px;
	}
</style>
