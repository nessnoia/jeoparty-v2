<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore, states } from '$lib/colyseus';
	import type { Room } from 'colyseus.js';

	let score: number;
	let wager: number;
	let sessionId = '';

	let form: HTMLFormElement;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		let playerFinalJeoparty = room.state.finalJeoparty.get(sessionId);
		if (player !== undefined && playerFinalJeoparty !== undefined) {
			score = player.score;
			wager = playerFinalJeoparty.wager;
		}

		room.state.listen('gameState', (change: any) => {
			if (change == states.TimesUp) {
				form.requestSubmit();
				goto('/finaljeopartywait');
			}
		});
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitAnswer = (e: SubmitEvent) => {
		let answer = new FormData(e.target as HTMLFormElement).get('answer');
		room?.send(states.FinalJeopartyAnswer, { answer: answer });
		goto('/finaljeopartywait');
	};
</script>

<div id="background">
	<form bind:this={form} on:submit|preventDefault={submitAnswer}>
		<h1>Final Jeoparty</h1>
		<span>Your score: ${score ?? ''}</span>
		<span>Your wager: ${wager ?? ''}</span>
		<input name="answer" placeholder="Enter answer" type="text" required />
		<button type="submit">Submit Answer</button>
	</form>
</div>

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
		justify-content: flex-start;
		padding: 10%;
		gap: 2%;
		height: 100%;
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
		margin-top: 10%;
		padding: 2%;
		font-size: var(--size-8);
		border-radius: 5px;
		border: none;
	}

	#background {
		width: 100%;
		height: 100%;
		background-color: var(--black);
		color: var(--white);
		font-size: var(--size-7);
	}
</style>
