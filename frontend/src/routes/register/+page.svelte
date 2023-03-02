<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form: { message?: string };
</script>

<h1>Create Account</h1>
<form method="POST" use:enhance>
	<label>
		Email
		<input type="email" name="email" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<label>
		Confirm Password
		<input type="password" name="confirm-password" />
	</label>
	<button type="submit">Create Account</button>
</form>
{#if form?.message}
	<p class="error">{form.message || ''}</p>
{/if}
<a href="/login">Return to login</a>
