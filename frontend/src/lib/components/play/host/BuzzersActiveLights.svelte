<script lang="ts">
	import { roomStore, events } from '$lib/colyseus';
	import type { Room } from 'colyseus.js';

	export let buzzersActive: boolean;
	export let dailyDoubleOpen: boolean;
	let numLights = 5;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		if (buzzersActive) {
			room.send(events.ActivateBuzzers);
		} else {
			room.send(events.DeactivateBuzzers);
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ' && !dailyDoubleOpen) {
			buzzersActive = !buzzersActive;
		}
	};
</script>

<div class="left">
	{#each Array(numLights) as _}
		<div class="light" class:active={buzzersActive} />
	{/each}
</div>

<div class="right">
	{#each Array(numLights) as _}
		<div class="light" class:active={buzzersActive} />
	{/each}
</div>

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	.light {
		background-color: var(--grey-700);
		height: 19.5%;
	}

	.light.active {
		background-color: var(--white);
	}

	.left,
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 2.5%;
		height: 100%;
		top: 0;
		position: absolute;
		background-color: var(--black);
	}

	.left {
		left: 0;
		border-right: 3px solid var(--black);
	}

	.right {
		right: 0;
		border-left: 3px solid var(--black);
	}
</style>
