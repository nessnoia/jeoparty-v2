<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GameInfo } from '$lib/database-models/game-info';
	import PlayBoard from '../play/PlayBoard.svelte';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let gameInfo: GameInfo;

	function goToEdit() {
		goto('/edit/' + gameInfo._id);
	}

	function goToPlay() {
		goto('/join');
	}
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<div slot="content">
			<h1>{gameInfo.gameTitle}</h1>
			<button><img src="/icons/caret-left.svg" alt="view previous round" /></button>
			<PlayBoard />
			<button><img src="/icons/caret-right.svg" alt="view next round" /></button>
			<button on:click={goToEdit}>Edit Game</button>
			<button on:click={goToPlay}>Start Game</button>
		</div>
	</ModalBase>
{/if}

<style>
</style>
