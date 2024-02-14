<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import type { PlayerFinalJeoparty } from '$lib/player';
	import { createEventDispatcher } from 'svelte';

	export let clue: Clue;
	export let responses: Map<string, PlayerFinalJeoparty>;

	const numResponsesPerPage = 15;

	let dispatch = createEventDispatcher();
	let showAnswer = false;
	let page = 1;

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === 'ArrowRight' || key === 'd') {
			if (!showAnswer) {
				showAnswer = true;
				return;
			}
			if (responses.size > page * numResponsesPerPage) page++;
			else dispatch('allAnswersShown');
		} else if (key === 'ArrowLeft' || key === 'a') {
			if (responses.size < page * numResponsesPerPage) page--;
		}
	};
</script>

<div id="responses-container">
	<h1>Final Jeoparty Responses</h1>
	<div class="grid">
		{#each [...responses.values()] as response, i}
			<!-- Show only numResponsesPerPage at a time -->
			{#if i >= numResponsesPerPage * (page - 1) && i < numResponsesPerPage * page}
				<div class="response">
					<p class="name">{response.name}</p>
					<p class="answer">{response.answer}</p>
					<p class="wager">$ {response.wager}</p>
				</div>
			{/if}
		{/each}
	</div>
	{#if showAnswer}
		<p class="clue-answer">{clue.answer}</p>
	{:else}
		<p></p>
	{/if}
</div>

<svelte:window on:keyup={handleKeyUp} />

<style>
	h1 {
		text-align: center;
		color: var(--white);
		padding: 0;
	}

	#responses-container {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 100%;
	}

	.grid {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		align-content: center;
		flex-wrap: wrap;
		width: 100%;
		height: 90%;
		gap: 5% 0.5%;
	}

	.response {
		background-color: var(--primary-500);
		color: var(--white);
		padding: 1.5%;
		text-align: center;
		flex-basis: 15%;
	}

	.clue-answer {
		color: var(--white);
		text-align: center;
		font-size: var(--size-4);
	}

	.name,
	.answer,
	.wager {
		margin: 5% 0;
	}

	.name {
		font-size: var(--size-7);
	}

	.answer {
		font-size: var(--size-5);
		font-weight: bold;
	}

	.wager {
		font-size: var(--size-7);
	}
</style>
