<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GameInfo } from '$lib/database-models/game-info';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let gameInfo: GameInfo;

	function goToEdit() {
		goto('/edit/' + gameInfo._id);
	}

	function goToPlay() {
		goto('/join/' + gameInfo._id);
	}
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<div slot="content">
			<h1>{gameInfo.gameTitle}</h1>
			<button on:click={goToEdit}>Edit Game</button>
			<button on:click={goToPlay}>Start Game</button>
		</div>
	</ModalBase>
{/if}

<style>
</style>
