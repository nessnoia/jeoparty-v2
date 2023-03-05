<script lang="ts">
	import type { Category } from '$lib/database-models/game-data';
	import { unsaved } from '$lib/unsaved';

	export let category: Category;
	export let roundIdx: number;
	export let categoryIdx: number;

	let categoryTitle = category.category;

	const saveCategoryUpdate = () => {
		unsaved.update((game) => {
			if (!game.categories) {
				game.categories = [];
			}
			let priorEdit = false;
			for (let categoryUpdate of game.categories) {
				if (categoryUpdate.roundIdx === roundIdx && categoryUpdate.categoryIdx === categoryIdx) {
					categoryUpdate.category = categoryTitle;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.categories.push({
					roundIdx: roundIdx,
					categoryIdx: categoryIdx,
					category: categoryTitle
				});
			}
			return game;
		});
	};
</script>

<input
	type="text"
	placeholder="Category"
	bind:value={categoryTitle}
	on:input={saveCategoryUpdate}
/>
