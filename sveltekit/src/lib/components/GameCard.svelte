<script lang="ts">
	import type { GameInfo } from '$lib/models/game-info';
	import GamePreviewModal from './GamePreviewModal.svelte';

	export let gameInfo: GameInfo;

	let gamePreviewOpen: boolean = false;
</script>

<button on:click={() => (gamePreviewOpen = true)}>
	<h3>{gameInfo.gameTitle}</h3>
</button>

<GamePreviewModal bind:isVisible={gamePreviewOpen} {gameInfo} />
