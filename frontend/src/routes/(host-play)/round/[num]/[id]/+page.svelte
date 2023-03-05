<script lang="ts">
	import BuzzersActiveLights from '$lib/components/play/BuzzersActiveLights.svelte';
	import PlayBoard from '$lib/components/play/PlayBoard.svelte';
	import PlayerDock from '$lib/components/play/PlayerDock.svelte';
	import type { Round } from '$lib/database-models/game-data';
	import type { PageData } from './$types';

	export let data: PageData;

	let round = data as Round;
	let buzzersActive = false;
</script>

<BuzzersActiveLights {buzzersActive} />
<PlayBoard {round} />
<BuzzersActiveLights {buzzersActive} />
<!-- <PlayerDock /> -->
