<script lang="ts">
	export let buzzersActive: boolean;
	let numLights = 5;

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ') {
			buzzersActive = !buzzersActive;
		}
	};
</script>

{#each Array(numLights) as _}
	<div class={buzzersActive ? 'active' : ''} />
{/each}

{#each Array(numLights) as _}
	<div class={buzzersActive ? 'active' : ''} />
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
