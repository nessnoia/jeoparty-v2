<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
	}
</script>

<slot />
