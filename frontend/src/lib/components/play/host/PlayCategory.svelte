<script lang="ts">
	import type { Category } from '$lib/database-models/game-data';
	import { onMount } from 'svelte/internal';

	export let category: Category;

	let lines: number;
	let headerDiv: HTMLDivElement;
	let header: HTMLHeadingElement;

	const countLines = () => {
		let divHeight = headerDiv.offsetHeight
		let lineHeight = parseInt(window.getComputedStyle(header).getPropertyValue('line-height'));
		lines = Math.floor(divHeight / lineHeight);
	}

	onMount(() => {
        countLines();
    })
</script>

<div class="category-container">
	<div bind:this={headerDiv}>
		<h3 bind:this={header} style="--lines: {lines}">{category.category}</h3>
	</div>
</div>

<style>
	h3 {
		color: var(--white);
		text-align: center;
		text-transform: uppercase;
		font-family: sans-serif;
		font-weight: bolder;
		white-space: wrap;
		word-wrap: break-word;
		margin: 0;
		line-height: 1;
		font-size: calc(var(--size-8) + (5px / (var(--lines))));
	}

	.category-container {
		background-color: var(--primary-500);
		align-content: center;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		padding: 0 4%;
	}
</style>
