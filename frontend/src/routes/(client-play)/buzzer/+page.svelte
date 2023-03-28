<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';

	let score = 0;
	let place = 1;

	let pointsBehind = 100;
	let playerAhead = 'ginny';

	let pointsAhead = 100;
	let playerBehind = 'justis';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
	}
</script>

<h3>Your score</h3>
<span>${score}</span>

<button />

<p>You are in {place} place</p>
<p>You are ${pointsBehind} behind {playerAhead}</p>
<p>You are ${pointsAhead} behind {playerBehind}</p>
