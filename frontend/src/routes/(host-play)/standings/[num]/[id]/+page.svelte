<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import FullPodium from '$lib/components/play/FullPodium.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameId = data.gameId;
	let roundNum = data.roundNum;

	if (browser) {
		setTimeout(() => {
			goto(`/round/${Number(roundNum) + 1}/${gameId}`);
		}, 8000);

		roomStore.subscribe((room: any) => {
			if (room) {
				room.send('updateGameState', { state: 'podium' });
			}
		});
	}
</script>

<h1>Standings</h1>

<FullPodium />
