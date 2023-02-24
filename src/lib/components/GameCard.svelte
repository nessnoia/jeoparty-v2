<script lang="ts">
	import GamePreviewModal from './GamePreviewModal.svelte';
	export let gameTitle: string;
	export let gameId: number;

	let gamePreviewOpen: boolean = false;
</script>

<button on:click={() => (gamePreviewOpen = true)}>
	<h3>{gameTitle}</h3>
</button>

<GamePreviewModal bind:isVisible={gamePreviewOpen} {gameId} />
