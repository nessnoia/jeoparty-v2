<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];

	const dragStart = (event: DragEvent, idx: number) => {
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			let object = {
				idx: idx
			};
			event.dataTransfer.setData('text/plain', JSON.stringify(object));
			event.stopPropagation();
		}
	};
</script>

<div id="games">
	{#each gamesList as game, idx}
		<div
			class="draggable"
			on:dragstart={(e) => dragStart(e, idx)}
			on:dragover|preventDefault={() => {
				return false;
			}}
			draggable={true}
		>
			<GameCard gameInfo={game} />
		</div>
	{/each}
</div>

<style>
	#games {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px 10%;
		padding-top: 2%;
	}

	.draggable {
		padding: 5px;
	}
</style>
