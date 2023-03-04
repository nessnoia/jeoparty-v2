<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Create New Game</h1>
<form method="POST" use:enhance>
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
	<!-- <label>
		Tags
		<input type="text" />
	</label> -->
	<button type="submit">Create</button>
</form>
