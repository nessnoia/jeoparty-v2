<script lang="ts">
	import { Circle3 } from 'svelte-loading-spinners';

	export let size: number = 60;
</script>

<slot />

<Circle3
	{size}
	ballTopLeft="var(--white)"
	ballTopRight="var(--primary-500)"
	ballBottomLeft="var(--secondary-500)"
	ballBottomRight="var(--tertiary-500)"
	unit="px"
	duration="2s"
/>
