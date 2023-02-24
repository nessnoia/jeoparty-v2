<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	// const checkFormSubmit = () => {
	// 	if (form?.success) {
	// 		goto(form.redirect);
	// 	}
	// };
</script>

<h1>Create New Game</h1>
<form method="POST" action="?/create" use:enhance>
	<label>
		Title
		<input name="title" type="text" />
	</label>
	<label>
		Type
		<label for="standard">Standard</label>
		<input name="type" type="radio" id="standard" value="standard" checked />
		<label for="custom">Custom</label>
		<input name="type" type="radio" id="custom" value="custom" />
	</label>
	<label>
		Tags
		<input type="text" />
	</label>
	<button formaction="?/create">Create</button>
</form>
