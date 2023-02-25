<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth/firebase';
	import GamesTable from '$lib/components/GamesTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);

	const goToCreatePage = () => {
		goto('/create');
	};
</script>

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

<GamesTable gamesList={data.games} />

<style>
	button img {
		width: 20px;
		height: 20px;
	}
</style>
