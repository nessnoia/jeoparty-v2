<script lang="ts">
	import type { GameInfo } from '$lib/models/game-info';
	import GameCard from './GameCard.svelte';
	import { auth } from '$lib/auth/firebase';

	export let gamesList: GameInfo[];

	let user = auth.currentUser;
</script>

{#each gamesList as game}
	<!-- TODO: Instead of filtering after query, we should probably filter at the database query level. -->
	{#if String(game.ownedBy) === user?.uid}
		<GameCard gameTitle={game.gameTitle} gameId={Number(game._id)} />
	{/if}
{/each}
