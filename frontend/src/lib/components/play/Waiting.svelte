<script lang="ts">
	import { Circle3 } from 'svelte-loading-spinners';

	export let size: number = 60;
	export let invert: boolean = false;

	var topLeftColour: string;
	if (invert) {
		topLeftColour = '--black';
	} else {
		topLeftColour = '--white';
	}
</script>

<slot />

<Circle3
	{size}
	ballTopLeft="var({topLeftColour})"
	ballTopRight="var(--primary-500)"
	ballBottomLeft="var(--secondary-500)"
	ballBottomRight="var(--tertiary-500)"
	unit="px"
	duration="2s"
/>
