<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GameData } from '$lib/database-models/game-data';
	import type { GameInfo } from '$lib/database-models/game-info';
	import { onMount } from 'svelte';
	import PlayBoard from '../play/PlayBoard.svelte';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let gameInfo: GameInfo;

	let gameDataPromise: Promise<any>;
	let roundShownIdx = 0;

	onMount(async () => {
		gameDataPromise = await (
			await fetch(`/api/game-data/${gameInfo._id}`, { method: 'GET' })
		).json();
		console.log(gameDataPromise); //<-- This works
	});

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
			{#if roundShownIdx > 0}
				<button on:click={() => roundShownIdx--}
					><img src="/icons/caret-left.svg" alt="view previous round" /></button
				>
			{/if}
			{#await gameDataPromise}
				<p>Getting preview...</p>
			{:then res}
				<PlayBoard round={res.data.rounds[roundShownIdx]} />
			{/await}
			<!-- TODO: hide button if index exceeds number of rows -->
			<button on:click={() => roundShownIdx++}
				><img src="/icons/caret-right.svg" alt="view next round" /></button
			>
			<button on:click={goToEdit}>Edit Game</button>
			<button on:click={goToPlay}>Start Game</button>
		</div>
	</ModalBase>
{/if}

<style>
</style>
