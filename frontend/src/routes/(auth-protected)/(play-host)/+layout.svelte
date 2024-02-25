<script lang="ts">
	import { browser } from '$app/environment';
	import { attemptReconnect, roomStore } from '$lib/colyseus';
	import { fade } from 'svelte/transition';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (browser) {
		if ($roomStore === undefined) {
			// let token = sessionStorage.getItem('reconnectionToken');
			// attemptReconnect(token).then((newToken) => {
			// 	sessionStorage.setItem('reconnectionToken', newToken);
			// });
			attemptReconnect();
		}
	}
</script>

{#key data.pathname}
	<div id="page-content" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
{/key}

<style>
	#page-content {
		width: 100%;
		height: 100%;
	}
</style>
