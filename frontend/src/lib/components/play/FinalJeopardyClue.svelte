<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import type { Category, Clue } from '$lib/database-models/game-data';
	import type { Room } from 'colyseus.js';

	export let category: Category;
	export let clue: Clue;

	let displayTitle = true;
	let displayCategory = false;
	let displayClue = false;
	let displayAnswer = false;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.send('updateGameState', { state: 'finalJeoparty' });
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key;

		if (displayTitle) {
			if (key === 'ArrowRight' || key === 'd') {
				displayCategory = true;
				displayTitle = false;
				room?.send('updateGameState', { state: 'finalJeopartyCategory' });
			}
			return;
		}

		if (displayCategory) {
			if (key === 'ArrowRight' || key === 'd') {
				displayCategory = false;
				displayClue = true;
				room?.send('updateGameState', { state: 'finalJeopartyAnswer' });
			}
			return;
		}

		if (displayClue) {
			if (key === 'ArrowLeft' || key === 'a') {
				displayCategory = true;
				displayClue = false;
			} else if (key === 'ArrowRight' || key === 'd') {
				displayClue = false;
				displayAnswer = true;
			} else if (key === 'Esc' || key === 'Escape') {
				displayClue = false;
			}
			return;
		}

		if (displayAnswer) {
			if (key === 'ArrowLeft' || key === 'a') {
				displayAnswer = false;
				displayClue = true;
			} else if (key === 'ArrowRight' || key === 'd' || key === 'Esc' || key === 'Escape') {
				// go to podium
			}
			return;
		}
	};
</script>

{#if displayTitle}
	<div>
		<p>Final Jeoparty</p>
	</div>
{/if}

{#if displayCategory}
	<div>
		<p>{category.category}</p>
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

<svelte:window on:keyup={handleKeyUp} />
