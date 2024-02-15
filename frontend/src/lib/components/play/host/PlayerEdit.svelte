<script lang="ts">
	import type { Player } from '$lib/player';
	import { cloneDeep } from 'lodash';

	export let players: Map<string, Player>;
	export let playerUpdates: Map<string, Player>;
</script>

<div id="background">
	{#each [...players] as [id, player] (id)}
		<div class="player-edit">
			<span class="name">{player.name}</span>
			<input
				value={player.score}
				on:input={(e) => {
					let playerCopy = cloneDeep(player);
					playerCopy.score = Number(e.currentTarget.value) || 0;
					playerUpdates.set(id, playerCopy);
				}}
				type="number"
			/>
		</div>
	{/each}
</div>

<style>
	#background {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 10%;
		gap: 5%;
		flex-wrap: wrap;
	}

	.player-edit {
		display: flex;
		align-items: center;
		width: 30%;
		gap: 20px;
	}

	span {
		background-color: var(--grey-100);
		padding: 10px;
		border-radius: 5px;
	}

	input {
		background-color: var(--white);
		flex-grow: 2;
		padding: 10px;
	}
</style>
