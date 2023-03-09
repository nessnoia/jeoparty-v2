<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';

	export let clue: Clue;
	export let updateScoreValue = 0;

	let displayClue = false;
	let displayAnswer = false;
	let displayDailyDouble = false;

	let clueUsed = false;

	const displayClueCard = () => {
		if (clue.isDailyDouble) displayDailyDouble = true;
		else displayClue = true;
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (displayDailyDouble) {
			if (key === 'Esc' || key === 'Escape') {
				displayDailyDouble = false;
			} else if (key === 'ArrowRight' || key === 'd') {
				displayDailyDouble = false;
				displayClue = true;
			}
			return;
		}

		if (displayClue) {
			if (key === ' ') {
			} else if (key === 'ArrowUp' || key === '+' || key === 'w') {
				updateScoreValue = clue.value;
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				updateScoreValue = -clue.value;
			} else if (key === 'ArrowRight' || key === 'd') {
				displayClue = false;
				displayAnswer = true;
			} else if (key === 'Esc' || key === 'Escape') {
				displayClue = false;
			}
			return;
		}

		if (displayAnswer) {
			if (key === 'ArrowUp' || key === '+' || key === 'w') {
				// May want to reevaluate how we're doing this - either by handling the ups and downs outside
				// of this component, or this might work if we update the score based on reactivity of the
				// update score value field, but I think it makes the most sense to handle the ArrowUp and such
				// outside of the module
				// maybe we emit updatescorevalue on question open, and then handle based on reactivity, I think
				// that makes the most sense, and then when the clue closes we can decide whether we want to
				// reset the update score value or allow for updating of the score still, in case the person forgets
				// before closing the question (@me) - or we could force them to manually update on this case...
				// perhaps dispatch it, as a "score update event", and then respond to it in the main board to update
				// the backend
				updateScoreValue = clue.value;
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				updateScoreValue = -clue.value;
			} else if (key === 'ArrowLeft' || key === 'a') {
				displayAnswer = false;
				displayClue = true;
			} else if (key === 'ArrowRight' || key === 'd' || key === 'Esc' || key === 'Escape') {
				displayAnswer = false;
				clueUsed = true;
			}
			return;
		}
	};
</script>

{#if !clueUsed}
	<button on:click={displayClueCard}>{clue.value}</button>
{:else}
	<div />
{/if}

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

<svelte:window on:keyup|preventDefault={onKeyUp} />
