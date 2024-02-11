<script lang="ts">
	import { roomStore,  states, events } from '$lib/colyseus';
	import type { Room } from 'colyseus.js';

	export let buzzersActive: boolean;
	export let startTimer: boolean;
	export let length: number;
	export let roundType: string;

	let numLights = 9;
	let interval = Number(length / Math.ceil(numLights / 2));
	let lightsActive: boolean[] = [];
	let counter = length;

	$: room = $roomStore as Room | undefined;

	let timer: number | undefined;

	$: if (startTimer) {
		handleTimerStart();
	} else {
		handleTimerCancel();
	}

	for (let i = 0; i < numLights; i++) {
		lightsActive.push(false);
	}

	const handleTimer = () => {
		let firstIdx = (length - counter) / interval;
		let lastIdx = numLights - firstIdx - 1;

		lightsActive[firstIdx] = false;
		lightsActive[lastIdx] = false;

		counter = counter - interval;
		if (counter === 0) {
			window.clearInterval(timer);
			timer = undefined;
			buzzersActive = false;
			room?.send(events.UpdateGameState, { state: states.TimesUp });
			room?.send(events.DeactivateFJTimer);
		}
	};

	const handleTimerStart = () => {
		for (let i = 0; i < numLights; i++) {
			lightsActive[i] = true;
		}
		counter = length;
		if (timer === undefined) {
			timer = window.setInterval(handleTimer, interval * 1000);
		}
	};

	const handleTimerCancel = () => {
		for (let i = 0; i < numLights; i++) {
			lightsActive[i] = false;
		}
		if (timer !== undefined) {
			window.clearInterval(timer);
			timer = undefined;
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ') {
			if (buzzersActive && roundType == 'normal') {
				handleTimerStart();
			} else if (!buzzersActive && roundType == 'normal') {
				handleTimerCancel();
			}

			if (roundType == 'final') {
				if (timer === undefined) {
					handleTimerStart();
					room?.send(events.ActivateFJTimer);
				} else {
					handleTimerCancel();
					room?.send(events.DeactivateFJTimer);
				}
			}
		}
	};
</script>

<div class="timer">
	{#each Array(numLights) as _, i}
		<div class="light" class:active={lightsActive[i]} />
	{/each}
</div>

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	.light {
		background-color: var(--grey-700);
		width: 10.9%;
	}

	.light.active {
		background-color: var(--white);
	}

	.timer {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: var(--black);
		height: 100%;
		border-bottom: 3px solid var(--black);
	}
</style>
