<script lang="ts">
	import type { Category } from '$lib/database-models/game-data';

	export let category: Category;
</script>

<div>
	<h3>{category.category}</h3>
</div>

<style>
	h3 {
		color: var(--white);
		text-align: center;
		padding: 1.5em 0;
		background-color: var(--primary-500);
		text-transform: uppercase;
		margin: 0.3em 0 0.4em 0;
		font-family: sans-serif;
		font-weight: bolder;
		font-size: var(--size-7);
	}
</style>
