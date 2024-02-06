<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';

	export let clue: Clue;
	export let dailyDoubleWagerSubmitted: boolean;

	const dispatch = createEventDispatcher();

	let clueOpened = false;

	let displayClue = false;
	let displayAnswer = false;
	let displayDailyDouble = false;

	let clueUsed = false;

	const displayClueCard = () => {
		clueOpened = true;
		if (clue.isDailyDouble) {
			displayDailyDouble = true;
			dispatch('dailyDouble');
		} else {
			displayClue = true;
			dispatch('clueOpen', { value: clue.value ?? 0 });
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (displayDailyDouble && dailyDoubleWagerSubmitted) {
			if (key === 'Esc' || key === 'Escape') {
				displayDailyDouble = false;
				clueOpened = false;
			} else if (key === 'ArrowRight' || key === 'd') {
				displayDailyDouble = false;
				displayClue = true;
			}
			return;
		}

		if (displayClue) {
			if (key === 'ArrowRight' || key === 'd') {
				displayClue = false;
				displayAnswer = true;
			} else if (key === 'Esc' || key === 'Escape') {
				displayClue = false;
				clueOpened = false;
			}
			return;
		}

		if (displayAnswer) {
			if (key === 'ArrowLeft' || key === 'a') {
				displayAnswer = false;
				displayClue = true;
			} else if (key === 'ArrowRight' || key === 'd' || key === 'Esc' || key === 'Escape') {
				displayAnswer = false;
				dispatch('clueUsed');
				clueUsed = true;
				clueOpened = false;
			}
			return;
		}
	};
	// TODO: Make iPad friendly with touch gestures
</script>

{#if !clueUsed}
	<button class="clue-button" on:click={displayClueCard}>${clue.value}</button>
{:else}
	<div class="used-clue" />
{/if}

{#if clueOpened}
	<div class="clue-showing">
		{#if displayDailyDouble}
			<div>
				<p>Daily Double</p>
			</div>
		{/if}

		{#if displayClue}
			<div>
				<p>{clue.clue}</p>
			</div>
		{/if}

		{#if displayAnswer}
			<div>
				<p>{clue.answer}</p>
			</div>
		{/if}
	</div>
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	.clue-button,
	.used-clue {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
	}

	.clue-button {
		background-color: var(--primary-500);
		color: var(--secondary-500);
		font-size: var(--size-2);
		font-weight: bold;
		font-family: fantasy;
		text-shadow: 3px 3px 4px var(--black);
	}

	.used-clue {
		background-color: transparent;
	}

	.clue-showing {
		position: absolute;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		top: 0;
		left: 0;
		height: 76%;
		width: 80%;
		margin-top: 3%;
		margin-left: 5%;
		padding: 1% 5%;
		background-color: var(--primary-500);
		color: var(--white);
		font-size: 4.3vw;
		text-transform: uppercase;
		font-weight: bold;
	}

	.clue-showing p {
		text-align: center;
	}
</style>
