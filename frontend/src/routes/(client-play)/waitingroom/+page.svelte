<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import * as Colyseus from 'colyseus.js';

	beforeNavigate(({ type }) => {
		roomStore.subscribe((room: any) => {
			if (room) {
				if (type === 'leave') {
					room.leave(true);
					roomStore.set(undefined);
				}
			}
		});
	});

	if (browser) {
		if ($roomStore === undefined) {
			const client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
			const joinObj = JSON.parse(sessionStorage.getItem('joinObj') ?? '');
			client.join('jeoparty', joinObj).then((room) => {
				roomStore.set(room);
				sessionStorage.setItem('roomId', room.id);
				sessionStorage.setItem('sessionId', room.sessionId);
			});
		}
	}
</script>

<Waiting>
	<h1>Waiting for game to start</h1>
</Waiting>

<!-- <svelte:window on:beforeunload={onBeforeUnload} /> -->
