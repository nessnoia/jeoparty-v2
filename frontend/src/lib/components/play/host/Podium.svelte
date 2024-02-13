<script lang="ts">
	import { characters } from '$lib/selector-maps';

	export let character: string;
	export let colourChoice: number;
	export let name: string;
	export let score: number;
	export let standing: number;
	export let numPlayers: number;

	let characterComponent = characters[character];
</script>

<div class="podium">
	<div class="character-container">
		<div class="character" style="--numPlayers: {numPlayers}">
			<svelte:component this={characterComponent} {colourChoice} />
		</div>
	</div>
	<div style="--standing: {standing}" class="podium-detail">
		<div class="mat">
			<div class="score"><span>${score}</span></div>
			<div class="name"><span>{name}</span></div>
			<div class="standing"><span>{standing}</span></div>
		</div>
	</div>
</div>

<style>
	.podium {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: calc((7 - var(--standing)) * 100px);
	}

	.character {
		max-height: calc((80vw / var(--numPlayers)) - 3vw);
		max-width: calc((80vw / var(--numPlayers)) - 3vw);
	}

	.character-container {
		display: flex;
		justify-content: center;
	}

	.podium-detail {
		height: calc((7 - var(--standing)) * 8vh);
		width: 100%;
		background-color: var(--primary-600);
		color: var(--black);
		border: 5px inset var(--primary-700);
		border-bottom: none;
	}

	.mat {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 5%;
		padding: 5% 8% 0 8%;

		width: 90%;
		height: 100%;
		background-color: var(--primary-700);
		border-left: 4px inset var(--primary-800);
		border-right: 4px inset var(--primary-800);
		margin: 0 auto;
	}

	.score,
	.name {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--white);
		border: 4px inset var(--grey-100);
		max-height: 70px;
	}

	.name span {
		font-size: var(--size-8);
	}

	.score span {
		font-weight: bold;
		font-size: var(--size-6);
	}

	.standing {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		flex-grow: 2;
	}

	.standing span {
		font-size: calc(var(--size-6) * (7 - var(--standing)));
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		color: var(--secondary-500);
	}
</style>
