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
			<div id="button-container">
				<button id="edit" on:click={goToEdit}>Edit</button>
				<button id="play" on:click={goToPlay}>Play</button>
			</div>
		</div>
	</ModalBase>
{/if}

<style>
	h1 {
		text-align: center;
	}

	#button-container {
		display: flex;
		flex-direction: row;
		gap: 1em;
		justify-content: space-between;
		padding: 10% 2% 3% 2%;
	}

	button {
		width: 50%;
	}

	#play {
	}

	#edit {
		border: 3px var(--primary-500) solid;
		color: var(--primary-500);
		background-color: transparent;
	}

	button:hover {
		cursor: pointer;
	}
</style>
