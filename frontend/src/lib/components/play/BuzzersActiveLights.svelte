<script lang="ts">
	export let buzzersActive: boolean;

	let numLights = 5;
</script>

{#each Array(numLights) as _, _}
	<div class={buzzersActive ? 'active' : ''} />
{/each}

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
