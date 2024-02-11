<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameSelectModal from '../modals/GameSelectModal.svelte';

	export let gameInfo: GameInfo;

	let gamePreviewOpen: boolean = false;
</script>

<button on:click={() => (gamePreviewOpen = true)}>
	{gameInfo.gameTitle}
</button>

<GameSelectModal bind:isVisible={gamePreviewOpen} {gameInfo} />

<style>
	button {
		padding: 10px 15px;
		height: 12vh;
		min-width: 100px;
		text-overflow: ellipsis;
		background-color: transparent;
		background-color: var(--primary-500);
		border-radius: 10px;
		color: var(--secondary-500);
		font-size: var(--size-9);
	}

	button:hover {
		cursor: pointer;
	}
</style>
