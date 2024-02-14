<script lang="ts">
	import { getAddRoundData } from '$lib/defaults/edit';
	import ModalBase from './ModalBase.svelte';
	import type { RoundUpdater } from '$lib/update-models/game-data';
	import { unsaved } from '$lib/unsaved';
	import { createEventDispatcher } from 'svelte';
	import { cloneDeep } from 'lodash';

	export let isVisible = false;
	export let rounds: RoundUpdater[];

	const dispatch = createEventDispatcher();

	let title = 'Round ' + (rounds.length + 1);
	let type = 'normal';

	const addRound = () => {
		let nextRoundNum = rounds.length + 1;
		let newRoundData = getAddRoundData(nextRoundNum, title, type);
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates.push(newRoundData);
			return game;
		});
		// Necessary so we don't get double updates in database due to pass by reference objects / arrays.
		let roundCopy = cloneDeep(newRoundData);
		rounds = [...rounds, roundCopy];
		dispatch('changeRound', { showRoundIdx: rounds.length - 1 });
		isVisible = false;
	};
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<h1>Add Round</h1>
		<div id="form">
			<div id="title">
				<label for="round-title">Round Title:</label>
				<input name="round-title" type="text" placeholder="Round Name" bind:value={title} />
			</div>
			<div id="radio-buttons">
				<label for="radio">Type:</label>
				<div id="buttons">
					<div class:active={type === 'normal'} class="radio-option">
						<label for="normal">Normal</label>
						<input
							name="type"
							type="radio"
							id="normal"
							value="normal"
							bind:group={type}
							checked
						/>
					</div>
					<div class:active={type === 'final'} class="radio-option">
						<label for="final">Final Jeoparty</label>
						<input
							name="type"
							type="radio"
							id="final"
							value="final"
							bind:group={type}
						/>
					</div>
				</div>
			</div>
			<button id="create" on:click={addRound}>Create Round</button>
		</div>
	</ModalBase>
{/if}

<style>
	h1 {
		text-align: center;
	}

	#form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		padding: 3%;
	}

	#title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		gap: 6%;
	}

	#title input {
		flex-grow: 1;
	}

	#radio-buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16%;
		width: 100%;
	}

	#buttons {
		flex-grow: 1;
		display: flex;
		gap: 1em;
	}

	.radio-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 4%;
		border: 1px solid var(--black);
		border-radius: 0.2em;
		width: 50%;
	}

	.radio-option input {
		appearance: none;
		border: none;
		background-color: transparent;
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}

	.radio-option input:checked {
		background-color: transparent;
	}

	.radio-option.active {
		border: 3px solid var(--black);
		border-radius: 0.2em;
	}

	.radio-option label {
		color: var(--black);
		text-transform: uppercase;
		text-align: center;
		width: 100%;
	}

	.radio-option.active label {
		font-weight: bold;
	}

	#create {
		width: 100%;
	}
</style>
