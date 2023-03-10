<script lang="ts">
	import { unsaved } from '$lib/unsaved';
	import type { ClueUpdater } from '$lib/update-models/game-data';
	import { createEventDispatcher } from 'svelte';

	export let clue: ClueUpdater;
	export let roundType: string;
	export let boardType: string;
	export let maxDailyDoublesReached: boolean = false;

	const dispatch = createEventDispatcher();

	export let shownClue:
		| {
				round?: number;
				category?: number;
				clue?: number;
		  }
		| undefined = undefined;

	$: if (shownClue !== currentClue) {
		showClueEditor = false;
	}

	const currentClue = {
		round: clue.roundIdx,
		category: clue.categoryIdx,
		clue: clue.clueIdx
	};

	let showClueEditor = false;

	const unsavedUpdater = (field: keyof ClueUpdater, value: any) => {
		unsaved.update((game) => {
			if (!game.clues) {
				game.clues = [];
			}
			let priorEdit = false;
			for (let update of game.clues) {
				if (
					update.roundIdx === clue.roundIdx &&
					update.categoryIdx === clue.categoryIdx &&
					update.clueIdx === clue.clueIdx
				) {
					update[field] = value;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.clues.push({
					roundIdx: clue.roundIdx,
					categoryIdx: clue.categoryIdx,
					clueIdx: clue.clueIdx
				});
				game.clues[game.clues.length - 1][field] = value;
			}
			return game;
		});
	};
</script>

{#if roundType === 'normal'}
	<button
		on:click={() => {
			shownClue = currentClue;
			showClueEditor = !showClueEditor;
		}}>{clue.value}</button
	>
{/if}

{#if showClueEditor || roundType === 'final'}
	{#if roundType === 'normal' && boardType === 'custom'}
		<input
			type="number"
			placeholder="Value"
			bind:value={clue.value}
			on:input={() => {
				if (clue.value === null) clue.value = 0;
				else unsavedUpdater('value', clue.value);
			}}
		/>
	{/if}
	<input
		type="text"
		placeholder="Clue"
		bind:value={clue.clue}
		on:input={() => unsavedUpdater('clue', clue.clue)}
	/>

	<!-- TODO: allow for uploading images for clues -->
	<!-- <label for="img">Upload clue image:</label>
		<input type="file" id="img" name="img" accept="image/*" /> -->

	<input
		type="text"
		placeholder="Answer"
		bind:value={clue.answer}
		on:input={() => unsavedUpdater('answer', clue.answer)}
	/>

	{#if roundType === 'normal'}
		<label for="daily-double">Make clue daily double?</label>
		<input
			type="checkbox"
			name="daily-double"
			bind:checked={clue.isDailyDouble}
			on:change={() => {
				unsavedUpdater('isDailyDouble', clue.isDailyDouble);
				let add = clue.isDailyDouble ? 1 : -1;
				dispatch('updateDailyDoubleNumber', { add: add });
			}}
			disabled={maxDailyDoublesReached && !clue.isDailyDouble}
		/>
	{/if}
{/if}
