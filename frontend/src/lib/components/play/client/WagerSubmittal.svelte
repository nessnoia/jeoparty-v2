<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let score: number;
	export let maxWager: number;

	let dispatch = createEventDispatcher();

	const submitWager = (e: SubmitEvent) => {
		let wager = Number(new FormData(e.target as HTMLFormElement).get('bet'));
		dispatch('submitWager', { wager: wager });
	};
</script>

<form on:submit|preventDefault={submitWager}>
	<h1><slot /></h1>
	<span>Your score: ${score ?? ''}</span>
	<span>Max wager: ${maxWager ?? ''}</span>
	<div id="wager-input">
		<label for="bet">Wager</label>
		<span>$</span><input
			name="bet"
			placeholder="Enter wager"
			type="number"
			required
			min="0"
			max={maxWager}
		/>
	</div>
	<button type="submit">Submit Wager</button>
</form>

<style>
	h1 {
		margin: 0;
		text-align: center;
		padding: 5%;
		font-size: var(--size-5);
		text-transform: uppercase;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		height: 40%;
		padding: 10%;
		gap: 5%;
	}

	button {
		padding: 5%;
		font-size: var(--size-8);
		background-color: var(--primary-500);
		border: none;
		border-radius: 5px;
		color: var(--white);
		margin-top: 8%;
	}

	input {
		padding: 2%;
		font-size: var(--size-8);
		border-radius: 5px;
		border: none;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: none;
	}

	#wager-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 5%;
	}

	#wager-input span {
		margin-left: 2%;
		margin-right: 2%;
	}
</style>
