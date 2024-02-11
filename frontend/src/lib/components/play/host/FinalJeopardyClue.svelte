<script lang="ts">
	import { roomStore,  states, events } from '$lib/colyseus';
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

<svelte:window on:keyup={handleKeyUp} />

<style>
	div {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: var(--primary-500);
		color: var(--white);
		font-size: 4.3vw;
		text-transform: uppercase;
		font-weight: bold;
	}

	div p {
		text-align: center;
	}
</style>
