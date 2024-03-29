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
	import { roomStore } from '$lib/colyseus';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

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

	// const join: SubmitFunction = async ({ formData }) => {
	const join = () => {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		let joinObj = {
			gameCode: gameCode,
			name: nickname,
			character: characterChoiceString,
			colour: colourChoice
		};

		// let room: Colyseus.Room = await client.join('jeoparty', joinObj)
		client.join('jeoparty', joinObj).then((room) => {
			roomStore.set(room);
			localStorage.setItem('reconnectionToken', room.reconnectionToken);
			localStorage.setItem('sessionId', room.sessionId);
		})
		goto('/waitingroom');
		// roomStore.set(room);
		// formData.set('reconnectionToken', room.reconnectionToken);
		// formData.set('sessionId', room.sessionId);
	};
</script>

<div id="container">
	<h1>Create Character</h1>
	<input
		id="nickname"
		placeholder="Nickname"
		type="text"
		maxlength=20
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

	<!-- <form method="POST" use:enhance={join}> -->
		<button id="join-game" class:hidden={nickname === ''} on:click={join}>Join Game</button>
	<!-- </form> -->
</div>

<style>
	#container {
		background-color: var(--black);
		color: var(--white);
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 8% 10%;
		gap: 5px;
	}

	h1 {
		margin: 0;
		text-transform: uppercase;
		font-size: var(--size-5);
	}

	h2 {
		margin: 0;
		text-transform: uppercase;
		font-size: var(--size-6);
	}

	form {
		width: 100%;
	}

	#nickname {
		width: 100%;
		padding: 2%;
		border: none;
		background-color: var(--white);
	}

	#nickname.error {
		border: 2px red solid;
	}

	.character {
		background-image: radial-gradient(var(--white), var(--grey-100), var(--grey-300));
		padding: 30px;
		border-radius: 10px;
		height: max(30vh, 230px);
		width: 100%;
		max-height: max(30%, 100vw);
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
		padding: 0;
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
		padding: 4%;
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
