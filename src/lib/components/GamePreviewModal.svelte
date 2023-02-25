<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GameInfo } from '$lib/models/game-info';
	import GameBoardPlay from './GameBoardPlay.svelte';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let gameInfo: GameInfo;

	function goToEdit() {
		goto('/edit/' + gameInfo._id);
	}
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<div slot="content">
			<h1>{gameInfo.gameTitle}</h1>
			<button><img src="/icons/caret-left.svg" alt="view previous round" /></button>
			<GameBoardPlay />
			<button><img src="/icons/caret-right.svg" alt="view next round" /></button>
			<button on:click={goToEdit}>Edit Game</button>
			<button>Start Game</button>
		</div>
	</ModalBase>
{/if}

<style>
</style>
