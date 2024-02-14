<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore, states } from '$lib/colyseus';
	import type { Room } from 'colyseus.js';

	let sessionId = '';

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('gameState', (change: string) => {
			if (change == states.DailyDouble) {
				if (room?.state.dailyDouble.playerId == sessionId) {
					goto('/dailydouble');
				}
			}

			if (change == states.ShowCategories) {
				goto('/categories');
			}

			if (change == states.Buzzer) {
				goto('/buzzer');
			}

			if (change == states.FinalJeoparty) {
				goto('/finaljeopartywait');
			}

			if (change == states.RoundPodium) {
				goto('/podium');
			}

			if (change == states.FinalPodium) {
				goto('/finalpodium');
			}
		});
	}
</script>

<slot />
