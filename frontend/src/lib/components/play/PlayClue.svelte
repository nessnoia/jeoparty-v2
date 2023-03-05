<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';

	export let clue: Clue;
</script>

<button>{clue.value}</button>
