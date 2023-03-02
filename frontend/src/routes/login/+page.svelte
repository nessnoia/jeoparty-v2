<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form: { message?: string };
</script>

<h1>Login</h1>
<form method="POST" action="?/email" use:enhance>
	<label>
		Email
		<input type="email" name="email" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button formaction="?/email">Login</button>
</form>

<a href="/api/oauth?provider=google" target="_blank">Continue with Google</a>
<a href="/api/oauth?provider=github" target="_blank">Continue with Github</a>
{#if form?.message}
	<p class="error">{form.message || ''}</p>
{/if}
<a href="/register">Create a new account</a>
