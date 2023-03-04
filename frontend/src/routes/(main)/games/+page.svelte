<script lang="ts">
	import { goto } from '$app/navigation';
	import GamesTable from '$lib/components/game-select/GamesTable.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let games = data.data;

	const goToCreatePage = () => {
		goto('/create');
	};
</script>

<form use:enhance method="post">
	<input type="submit" class="button" value="Sign out" />
</form>

<button><img src="/icons/circle-minus.svg" alt="delete games" /></button>
<button on:click={goToCreatePage}><img src="/icons/circle-plus.svg" alt="add game" /></button>

<h1>Your Games</h1>

<input type="text" placeholder="Search for games" />

<!-- TODO: Add filtering functionality -->
<!-- <div>
	<span>Filter by:</span>
	<button>Tags</button>
	<button># of Rounds</button>
	<button># of Questions</button>
</div> -->

<GamesTable gamesList={games} />

<style>
	button img {
		width: 20px;
		height: 20px;
	}
</style>
