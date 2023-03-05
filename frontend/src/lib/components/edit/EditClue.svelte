<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import { unsaved } from '$lib/unsaved';
	import type { ClueUpdater } from '$lib/update-models/game-data';

	export let clue: Clue;
	export let roundIdx: number;
	export let categoryIdx: number;
	export let clueIdx: number;

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
		round: roundIdx,
		category: categoryIdx,
		clue: clueIdx
	};

	let showClueEditor = false;

	let clueValue = clue.value;
	let clueText = clue.clue;
	let answerText = clue.answer;
	let isDailyDouble = clue.isDailyDouble;

	const unsavedUpdater = (field: keyof ClueUpdater, value: any) => {
		unsaved.update((game) => {
			if (!game.clues) {
				game.clues = [];
			}
			let priorEdit = false;
			for (let update of game.clues) {
				if (
					update.roundIdx === roundIdx &&
					update.categoryIdx === categoryIdx &&
					update.clueIdx === clueIdx
				) {
					update[field] = value;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.clues.push({
					roundIdx: roundIdx,
					categoryIdx: categoryIdx,
					clueIdx: clueIdx
				});
				game.clues[game.clues.length - 1][field] = value;
			}
			return game;
		});
	};
</script>

<button
	on:click={() => {
		shownClue = currentClue;
		showClueEditor = !showClueEditor;
	}}>{clueValue}</button
>

{#if showClueEditor}
	<input
		type="number"
		placeholder="Value"
		bind:value={clueValue}
		on:input={() => {
			if (clueValue === null) clueValue = 0;
			else unsavedUpdater('value', clueValue);
		}}
	/>
	<input
		type="text"
		placeholder="Clue"
		bind:value={clueText}
		on:input={() => unsavedUpdater('clue', clueText)}
	/>

	<!-- TODO: allow for uploading images for clues -->
	<!-- <label for="img">Upload clue image:</label>
		<input type="file" id="img" name="img" accept="image/*" /> -->

	<input
		type="text"
		placeholder="Answer"
		bind:value={answerText}
		on:input={() => unsavedUpdater('answer', answerText)}
	/>

	<label for="daily-double">Make clue daily double?</label>
	<input
		type="checkbox"
		name="daily-double"
		bind:checked={isDailyDouble}
		on:change={() => unsavedUpdater('isDailyDouble', isDailyDouble)}
	/>
{/if}
