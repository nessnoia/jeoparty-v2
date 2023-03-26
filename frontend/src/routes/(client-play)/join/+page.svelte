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

<div>
	<input placeholder="Game Code" type="text" bind:value={gameCode} />
	<button on:click={join}>Join</button>
	<span>{errorMessage}</span>
</div>
