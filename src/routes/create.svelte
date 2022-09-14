<script lang="ts">
	import Elephant from '../components/characters/elephants/Elephant.svelte';
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte/internal';
	import {
		activitySelectors,
		characters,
		characterSelectors,
		animalToActivities
	} from '../selector-maps';

	let colourChoice: number = 0;
	let characterChoice: ComponentType = Elephant;
	let animalChoiceString: string = 'elephant';

	let randomElephantIndexes: Set<number> = new Set();

	onMount(() => {
		randomElephantIndexes = getTwoRandomIndexes(3, animalToActivities['elephant'].length);
	});

	function changeCharaterSelection(selector: ComponentType) {
		animalChoiceString = characterSelectors.get(selector) || '';
		characterChoice = characters[animalChoiceString];
	}

	function changeActivitySelection(selector: ComponentType) {
		let choice = activitySelectors.get(selector) || '';
		let character = animalChoiceString + choice;
		characterChoice = characters[character];
	}

	function getTwoRandomIndexes(min: number, max: number): Set<number> {
		let indexes = new Set<number>();
		return generateTwoRandomUniqueIndexes(indexes, min, max);
	}

	function generateTwoRandomUniqueIndexes(
		indexes: Set<number>,
		min: number,
		max: number
	): Set<number> {
		console.log(indexes);
		let index = Math.floor(Math.random() * (max - min) + min);
		if (indexes.size == 2) {
			return indexes;
		}
		if (!indexes.has(index)) {
			indexes.add(index);
		}
		return generateTwoRandomUniqueIndexes(indexes, min, max);
	}
</script>

<div>
	<h1>Create Character</h1>
	<input placeholder="Nickname" type="text" />

	<div class="charactor">
		<svelte:component this={characterChoice} {colourChoice} />
	</div>

	<h2>Select Character</h2>

	<button><img src="icons/caret-left.svg" alt="character scroll left" /></button>
	{#each [...characterSelectors] as [selector, _]}
		<button class="char-selector" on:click={() => changeCharaterSelection(selector)}>
			<svelte:component this={selector} />
		</button>
	{/each}
	<button><img src="icons/caret-right.svg" alt="character scroll right" /></button>

	<h2>Select Activity</h2>

	<button><img src="icons/caret-left.svg" alt="activity scroll left" /></button>
	{#if animalChoiceString == 'elephant'}
		{#each animalToActivities[animalChoiceString] as selector, i}
			{#if i == 0 || i == 1 || i == 2 || randomElephantIndexes.has(i)}
				<button class="act-selector" on:click={() => changeActivitySelection(selector)}>
					<svelte:component this={selector} />
				</button>
			{/if}
		{/each}
	{:else}
		{#each animalToActivities[animalChoiceString] as selector}
			<button class="act-selector" on:click={() => changeActivitySelection(selector)}>
				<svelte:component this={selector} />
			</button>
		{/each}
	{/if}
	<button><img src="icons/caret-right.svg" alt="activity scroll right" /></button>

	<div>
		<h2>Colour</h2>
		<input id="colour-selector" type="range" min="0" max="360" bind:value={colourChoice} />
		<div class="colour" />
	</div>

	<button>Join Game</button>
</div>

<style>
	img {
		height: 10px;
	}

	.charactor {
		width: 300px;
		height: 300px;
	}

	.char-selector,
	.act-selector {
		height: 50px;
		width: 50px;
	}

	/** Chrome*/
	input[type='range'] {
		overflow: hidden;
		width: 80%;
		height: 15px;
		border-radius: 15px;
		-webkit-appearance: none;
		background: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}
	/* input[type='range']::-webkit-slider-runnable-track {
		height: 10px;
		-webkit-appearance: none;
		color: #13bba4;
		margin-top: -1px;
	} */
	input[type='range']::-webkit-slider-thumb {
		width: 15px;
		-webkit-appearance: none;
		height: 15px;
		/* box-shadow: ; */
		border-radius: 50%;
		/* border-width: 2px;
		border-color: white; */
		background: #434343;
	}

	/** FF*/
	input[type='range']::-moz-range-track {
		background-color: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}

	/* IE*/
	/* input[type='range']::-ms-fill-lower {
		background-color: #43e5f7;
	} */
	input[type='range']::-ms-fill {
		background-color: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}

	/* #colour-selector {
		background: 
	} */
</style>
