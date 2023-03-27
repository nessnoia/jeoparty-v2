<script lang="ts">
	export let buzzersActive: boolean;
	export let length: number;

	let numLights = 9;
	let interval = Number(length / Math.ceil(numLights / 2));
	let lightsActive: boolean[] = [];
	let counter = length;

	let timer: number | undefined;

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
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ') {
			if (buzzersActive) {
				for (let i = 0; i < numLights; i++) {
					lightsActive[i] = true;
				}
				counter = length;
				if (timer === undefined) {
					timer = window.setInterval(handleTimer, interval * 1000);
				}
			} else {
				for (let i = 0; i < numLights; i++) {
					lightsActive[i] = false;
				}
				if (timer !== undefined) {
					window.clearInterval(timer);
					timer = undefined;
				}
			}
		}
	};
</script>

{#each Array(numLights) as _, i}
	<div class={lightsActive[i] ? 'active' : ''} />
{/each}

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	div {
		height: 50px;
		width: 100px;
		background-color: yellow;
	}

	div.active {
		height: 50px;
		width: 100px;
		background-color: blue;
	}
</style>
