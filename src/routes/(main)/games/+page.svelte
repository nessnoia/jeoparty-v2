<script>
	import GamesTable from '$lib/components/GamesTable.svelte';
</script>

<button><img src="/icons/circle-minus.svg" alt="delete games" /></button>
<button><img src="/icons/circle-plus.svg" alt="add game" /></button>

<h1>Your Games</h1>

<input type="text" placeholder="Search for games" />

<div>
	<span>Filter by:</span>
	<button>Tags</button>
	<button># of Rounds</button>
	<button># of Questions</button>
</div>

<GamesTable />

<style>
	button img {
		width: 20px;
		height: 20px;
	}
</style>
