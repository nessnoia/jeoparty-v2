<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import EditBoard from '$lib/components/edit/EditBoard.svelte';
	import { unsaved } from '$lib/unsaved';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: { saved?: boolean };

	let formElement: HTMLFormElement;

	const gameData = data.gameData.data;
	const gameInfo = data.gameInfo.data;
	const saveDelay = 10000;

	$: if (form?.saved) unsaved.set({});

	$: $unsaved, handleSave();

	const debounce = (callback: Function, delay: number) => {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				callback(...args);
			}, delay);
		};
	};

	const handleSave = debounce(() => {
		if (formElement && Object.keys($unsaved).length > 0) {
			console.log('save');
			formElement.requestSubmit();
		}
	}, saveDelay);

	const beforeUnload = (event: BeforeUnloadEvent) => {
		if (Object.keys($unsaved).length > 0) {
			event.preventDefault();
			event.returnValue = '';
			return '';
		}
	};

	beforeNavigate((event) => {
		console.log($unsaved);
		if (Object.keys($unsaved).length > 0) {
			event.cancel();
			// TODO: show error message to user instead of preventing navigation.
		}
	});
</script>

{#if Object.keys($unsaved).length > 0}
	<img src="/icons/spinner.svg" alt="save pending spinner" />
	<span>Saving...</span>
{:else}
	<img src="/icons/circle-check.svg" alt="changes saved" />
	<span>All changes saved.</span>
{/if}

<EditBoard {gameInfo} {gameData} />

<form bind:this={formElement} method="POST" use:enhance>
	<input type="hidden" name="unsaved-changes" value={JSON.stringify($unsaved)} />
</form>

<svelte:window on:beforeunload={beforeUnload} />
