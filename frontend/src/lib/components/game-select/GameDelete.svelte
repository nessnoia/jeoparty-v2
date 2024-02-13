<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';

	export let games: GameInfo[];

	const handleDrop = (event: DragEvent) => {
		if (event.dataTransfer) {
			const obj = JSON.parse(event.dataTransfer.getData('text/plain'));
			const deleteIdx = obj.idx;
			const game = games[deleteIdx];

			games.splice(deleteIdx, 1);

			// TODO: handle response
			fetch(`/api/game-info/${game._id}`, {
				method: 'DELETE'
			});
			games = games;
		}
	};
</script>

<div on:drop={handleDrop} on:dragover|preventDefault>
	<img src="/icons/trash.svg" alt="delete game" />
</div>

<style>
	img {
		height: 30px;
		width: 30px;
	}
</style>
