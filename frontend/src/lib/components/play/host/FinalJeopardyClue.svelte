<script lang="ts">
	import { roomStore, states, events } from '$lib/colyseus';
	import type { Category, Clue } from '$lib/database-models/game-data';
	import type { PlayerFinalJeoparty } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import { createEventDispatcher } from 'svelte';

	export let category: Category;
	export let clue: Clue;
	export let responses: Map<string, PlayerFinalJeoparty>;

	let dispatch = createEventDispatcher();

	let displayTitle = true;
	let displayCategory = false;
	let displayClue = false;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		if (displayTitle) {
			room.send(events.UpdateGameState, { state: states.FinalJeoparty });
		}

		room.state.listen('gameState', (change: string) => {
			if (displayClue && change == states.TimesUp) {
				dispatch('showPlayerAnswers');
			}
		});

		let numPlayers = room?.state.players.size;
		if (displayCategory && numPlayers === responses.size) {
			showClue();
		}
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key;

		if (displayTitle) {
			if (key === 'ArrowRight' || key === 'd') {
				showCategory();
			}
			return;
		}

		if (displayCategory) {
			if (key === 'ArrowRight' || key === 'd') {
				showClue();
			}
			return;
		}

		if (displayClue) {
			if (key === 'ArrowRight' || key === 'd') {
				dispatch('showPlayerAnswers');
			}
			return;
		}
	};

	const showCategory = () => {
		displayCategory = true;
		displayTitle = false;
		room?.send(events.UpdateGameState, { state: states.FinalJeopartyCategory });
	};

	const showClue = () => {
		displayCategory = false;
		displayClue = true;
		room?.send(events.UpdateGameState, { state: states.FinalJeopartyAnswer });
	};
</script>

{#if displayTitle}
	<div>
		<h1>Final Jeoparty</h1>
	</div>
{/if}

{#if displayCategory}
	<div>
		<h2>{category.category}</h2>
	</div>
{/if}

{#if displayClue}
	<div>
		<h2>{clue.clue}</h2>
	</div>
{/if}

<svelte:window on:keyup={handleKeyUp} />

<style>
	h1 {
		font-size: var(--size-1);
	}

	h2 {
		font-size: var(--size-2);
	}

	div {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: var(--primary-500);
		color: var(--white);
		text-transform: uppercase;
	}

	div h2,
	div h1 {
		text-align: center;
	}
</style>
