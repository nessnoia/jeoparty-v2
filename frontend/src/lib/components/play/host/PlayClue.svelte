<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';

	export let clue: Clue;
	export let dailyDoubleWager: number | undefined;

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
			dispatch('clueOpened', { value: clue.value ?? 0 });
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (displayDailyDouble) {
			if (key === 'Esc' || key === 'Escape') {
				displayDailyDouble = false;
				clueOpened = false;
			} else if ((key === 'ArrowRight' || key === 'd') && dailyDoubleWager !== undefined) {
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
	<div class="clue-flexbox">
		<div class="clue-showing">
			{#if displayDailyDouble}
				<div>
					<h1>Daily Double</h1>
					{#if dailyDoubleWager !== undefined}
						<h2>Wager: ${dailyDoubleWager}</h2>
					{/if}
				</div>
			{/if}

			{#if displayClue}
				<div>
					<h2>{clue.clue}</h2>
				</div>
			{/if}

			{#if displayAnswer}
				<div>
					<h2>{clue.answer}</h2>
				</div>
			{/if}
		</div>
	</div>
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	h1 {
		font-size: var(--size-1);
	}

	h2 {
		font-size: var(--size-2);
	}

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
		padding: 3%;
	}

	.clue-flexbox {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 2.5%;
		width: 100%;
		height: 82.5%;
	}

	.clue-showing {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		height: 90%;
		width: 90%;
		background-color: var(--primary-500);
		color: var(--white);
		font-size: 4.3vw;
		text-transform: uppercase;
		font-weight: bold;
		padding: 2%;
	}

	div h2,
	div h1 {
		text-align: center;
	}
</style>
