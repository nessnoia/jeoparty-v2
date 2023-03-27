<script lang="ts">
	let score = 0;
	let place = 1;

	let pointsBehind = 100;
	let playerAhead = 'ginny';

	let pointsAhead = 100;
	let playerBehind = 'justis';
</script>

<h3>Your score</h3>
<span>${score}</span>

<button />

<p>You are in {place} place</p>
<p>You are ${pointsBehind} behind {playerAhead}</p>
<p>You are ${pointsAhead} behind {playerBehind}</p>
