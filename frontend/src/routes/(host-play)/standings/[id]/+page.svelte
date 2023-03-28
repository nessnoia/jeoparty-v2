<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Podium from '$lib/components/play/Podium.svelte';

	let players: {
		character: string;
		colourChoice: number;
		name: string;
		score: number;
		standing: number;
	}[] = [
		{ character: 'elephant', colourChoice: 120, name: 'spencer', score: 1000, standing: 1 },
		{ character: 'elephantGardener', colourChoice: 306, name: 'vanessa', score: 800, standing: 2 },
		{ character: 'otter', colourChoice: 3, name: 'michelle', score: 700, standing: 3 },
		{ character: 'kangarooHockey', colourChoice: 210, name: 'glenn', score: 600, standing: 4 },
		{ character: 'penguinGhost', colourChoice: 278, name: 'ginny', score: 500, standing: 5 },
		{ character: 'mooseArtist', colourChoice: 358, name: 'vic', score: 400, standing: 6 }
	];

	if (browser) {
		if ($roomStore === undefined) {
			attemptReconnect();
		}
	}
</script>

<h1>Standings</h1>

<div class="podium">
	{#each players as player}
		<Podium
			character={player.character}
			colourChoice={player.colourChoice}
			name={player.name}
			score={player.score}
			standing={player.standing}
		/>
	{/each}
</div>

<style>
	.podium {
		display: flex;
	}
</style>
