<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	if (browser) {
		goto('/games');
	}
</script>
