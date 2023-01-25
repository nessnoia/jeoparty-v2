<script>
	import GameBoardPlay from "src/components/GameBoardPlay.svelte";

</script>
<script context="module" lang="ts">
	export async function load({ fetch, params }: any) {
		const gameDataRes = await fetch(`../mocks/gameData/game${params.id}.json`);
		const gameData = await gameDataRes.json();

		if (gamesRes.ok && gameDataRes.ok) {
			return {
				props: {
					gameData: gameData
				}
			};
		}
	}
</script>

<script lang="ts">
    export let gameData: any;
</script>

<!-- <GameBoardPlay roundData={gameData.rounds} -->