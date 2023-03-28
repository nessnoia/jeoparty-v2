<script>
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
	}
</script>

<Waiting>
	<h1>Showing categories</h1>
	<h2>Get ready...</h2>
</Waiting>
