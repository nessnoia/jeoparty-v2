<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />
<div id="page-content">
	<slot />
</div>

<style>
	#page-content {
		padding-top: 8vh;
	}
</style>
