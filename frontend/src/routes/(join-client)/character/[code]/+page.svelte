<script lang="ts">
	import Elephant from '$lib/components/characters/elephants/Elephant.svelte';
	import type { ComponentType } from 'svelte/internal';
	import {
		activitySelectors,
		characters,
		characterSelectors,
		animalToActivities
	} from '$lib/selector-maps';
	import * as Colyseus from 'colyseus.js';
	import type { PageData } from './$types';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';

	export let data: PageData;

	let gameCode = data.code;
	let randomElephantIndexes = data.indexes;

	let nickname = '';
	let errorName = false;
	let colourChoice: number = 0;
	let characterChoice: ComponentType = Elephant;
	let animalChoiceString: string = 'elephant';
	let characterChoiceString: string = 'elephant';
	let activityChoiceString: string = '';

	function changeCharaterSelection(selector: ComponentType) {
		animalChoiceString = characterSelectors.get(selector) || '';
		characterChoiceString = animalChoiceString;
		characterChoice = characters[animalChoiceString];
		activityChoiceString = '';
	}

	function changeActivitySelection(selector: ComponentType) {
		let choice = activitySelectors.get(selector) || '';
		characterChoiceString = animalChoiceString + choice;
		characterChoice = characters[characterChoiceString];
		activityChoiceString = choice;
	}

	const join = () => {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		let joinObj = {
			gameCode: gameCode,
			name: nickname,
			character: characterChoiceString,
			colour: colourChoice
		};
		client.join('jeoparty', joinObj).then((room) => {
			roomStore.set(room);
			sessionStorage.setItem('joinObj', JSON.stringify(joinObj));
			sessionStorage.setItem('roomId', room.id);
			sessionStorage.setItem('sessionId', room.sessionId);
		});
		goto('/waitingroom');
	};
</script>

<div id="container">
	<h1>Create Character</h1>
	<input
		id="nickname"
		placeholder="Nickname"
		type="text"
		bind:value={nickname}
		class:error={errorName}
	/>

	<div class="character">
		<svelte:component this={characterChoice} {colourChoice} />
	</div>

	<h2>Select Character</h2>

	<div class="selectors">
		{#each [...characterSelectors] as [selector, selectorString]}
			<button
				class="char-selector"
				class:is-selected={animalChoiceString === selectorString}
				on:click={() => changeCharaterSelection(selector)}
			>
				<svelte:component this={selector} />
			</button>
		{/each}
	</div>

	<h2>Select Activity</h2>

	<div class="selectors">
		{#each animalToActivities[animalChoiceString] as selector, i}
			{#if (animalChoiceString === 'elephant' && (i == 0 || i == 1 || i == 2 || randomElephantIndexes.has(i))) || animalChoiceString !== 'elephant'}
				<button
					class="act-selector"
					class:is-selected={activityChoiceString === activitySelectors.get(selector)}
					on:click={() => changeActivitySelection(selector)}
				>
					<svelte:component this={selector} />
				</button>
			{/if}
		{/each}
	</div>

	<h2>Colour</h2>
	<input id="colour-selector" type="range" min="0" max="360" bind:value={colourChoice} />
	<div class="colour" />

	<button id="join-game" class:hidden={nickname === ''} on:click={join}>Join Game</button>
</div>

<style>
	/* TODO: make look nice in landscape mode just in case */
	#container {
		width: 100%;
		height: 100%;
		background-color: var(--black);
		color: var(--white);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 8% 10%;
	}

	h1 {
		margin: 0;
		text-transform: uppercase;
		font-size: var(--size-6);
	}

	h2 {
		margin: 0;
		text-transform: uppercase;
		font-size: var(--size-7);
	}

	#nickname {
		width: 100%;
		padding: 2%;
		border: none;
		border-radius: 5px;
		font-size: var(--size-9);
	}

	#nickname.error {
		border: 2px red solid;
	}

	.character {
		background-image: radial-gradient(var(--white), var(--grey-100), var(--grey-300));
		padding: 30px;
		border-radius: 10px;
		height: 30%;
		width: 100%;
		max-height: 400px;
		max-width: 400px;
	}

	.char-selector,
	.act-selector {
		aspect-ratio: 1/1;
		padding: 2%;
		max-width: 100px;
		max-height: 100px;
		background-color: var(--grey-100);
		border: none;
		border-radius: 5px;
		overflow: visible;
	}

	.selectors {
		display: flex;
		gap: 2px;
	}

	.is-selected {
		background-color: var(--secondary-500);
	}

	/** Chrome*/
	input[type='range'] {
		overflow: hidden;
		width: 95%;
		height: 3%;
		border-radius: 15px;
		-webkit-appearance: none;
		appearance: none;
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

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: var(--white);
		border: 2px solid var(--tertiary-500);
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
	}

	/** FF*/
	input[type='range']::-moz-range-thumb {
		background: var(--white);
		border: 2px solid var(--tertiary-500);
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
	}

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

	input[type='range']::-ms-thumb {
		background: var(--white);
		border: 2px solid var(--tertiary-500);
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
	}

	#join-game {
		padding: 2% 4%;
		width: 100%;
		border-radius: 5px;
		border: none;
		background-color: var(--primary-500);
		color: var(--white);
		font-size: var(--size-8);
	}

	.hidden {
		display: none;
	}
</style>
