<script>
	import Waiting from '$lib/components/play/client/Waiting.svelte';

	let score = 0;
	let place = 1;

	let pointsBehind = 100;
	let playerAhead = 'ginny';

	let pointsAhead = 100;
	let playerBehind = 'justis';
</script>

<Waiting>
	<h1>Waiting for next round</h1>
</Waiting>

<p>Your score: ${score}</p>
<p>You are in {place} place</p>
<p>You are ${pointsBehind} behind {playerAhead}</p>
<p>You are ${pointsAhead} behind {playerBehind}</p>
