<script lang="ts">
	import { goto } from '$app/navigation';

	let gameCode: string;
	let errorMessage = '';

	const join = async () => {
		const res = await fetch(`/api/game-instance/${gameCode}`, { method: 'GET' });
		const data = await res.json();

		if (!data.found) {
			errorMessage = 'That code does not match any active games.';
		} else {
			goto(`character/${gameCode}`);
		}
	};
</script>

<div id="container">
	<form on:submit|preventDefault={join}>
		<h1>Join Game</h1>
		<input placeholder="Enter Game Code..." type="text" bind:value={gameCode} />
		<button type="submit">Join Game</button>
	</form>
	<span>{errorMessage}</span>
</div>

<style>
	h1 {
		margin: 0;
		text-align: center;
		padding: 5%;
		text-transform: uppercase;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%;
		padding: 10%;
		gap: 2%;
	}

	button {
		margin-top: 5%;
	}

	input {
		padding: 2% 4%;
		border: none;
		background-color: var(--white);
	}

	#container {
		background-color: var(--black);
		color: var(--white);
	}
</style>
