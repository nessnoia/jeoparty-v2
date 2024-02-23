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
		<div class="name">
			<p>{name}</p>
		</div>
	</div>
</div>

<style>
	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		width: 180px;
		height: 200px;
	}

	p {
		margin: 0;
		width: 100%;
	}

	.score {
		padding: 0.8em 1em;
	}

	.name {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		padding: 4%;
		margin: 0;
		width: 100%;
		word-wrap: break-word;
		font-family: Caveat;
		font-weight: 600;
	}
	
	.name p {
		font-size: var(--size-4);
		line-height: 0.8em;
	}

	.score,
	.name {
		border: 1px solid var(--black);
		background-color: var(--white);
	}
</style>
