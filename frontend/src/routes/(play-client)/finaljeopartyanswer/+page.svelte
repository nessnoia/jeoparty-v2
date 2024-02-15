<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore, states, events } from '$lib/colyseus';
	import type { Room } from 'colyseus.js';

	let score: number;
	let wager: number;
	let sessionId = '';

	let answer: string;

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
				// Doing this manually because form.requestSubmit() was causing me problems.
				/* room?.send(events.FinalJeopartyAnswer, { answer: answer }); */
				goto('/finaljeopartywait/answer');
			}
		});
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitAnswer = (e: SubmitEvent) => {
		let answer = new FormData(e.target as HTMLFormElement).get('answer');
		room?.send(events.FinalJeopartyAnswer, { answer: answer });
		goto('/finaljeopartywait/answer');
	};
</script>

<div id="container">
	<form on:submit|preventDefault={submitAnswer}>
		<h1>Answer</h1>
		<span>Your score: ${score ?? ''}</span>
		<span>Your wager: ${wager ?? ''}</span>
		<input name="answer" placeholder="Enter answer" type="text" bind:value={answer} required />
		<button type="submit">Submit Answer</button>
	</form>
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
		padding: 10%;
		gap: 2%;
		height: 100%;
	}

	button {
		margin-top: 8%;
	}

	input {
		margin-top: 10%;
		padding: 2%;
		border: none;
		background-color: var(--white);
	}

	#container {
		background-color: var(--black);
		color: var(--white);
	}
</style>
