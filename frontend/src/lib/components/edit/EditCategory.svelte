<script lang="ts">
	import { unsaved } from '$lib/unsaved';
	import type { CategoryUpdater } from '$lib/update-models/game-data';

	export let category: CategoryUpdater;

	const saveCategoryUpdate = () => {
		unsaved.update((game) => {
			if (!game.categories) {
				game.categories = [];
			}
			let priorEdit = false;
			for (let categoryUpdate of game.categories) {
				if (
					categoryUpdate.roundIdx === category.roundIdx &&
					categoryUpdate.categoryIdx === category.categoryIdx
				) {
					categoryUpdate.category = category.category;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.categories.push({
					roundIdx: category.roundIdx,
					categoryIdx: category.categoryIdx,
					category: category.category
				});
			}
			return game;
		});
	};
</script>

<input
	type="text"
	placeholder="Category"
	bind:value={category.category}
	on:input={saveCategoryUpdate}
/>
