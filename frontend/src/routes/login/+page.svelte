<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	let error = '';
</script>

<h1>Login</h1>
<form method="post">
	<label>
		Email
		<input type="email" name="email" bind:value={email} />
	</label>
	<label>
		Password
		<input type="password" name="password" bind:value={password} />
	</label>
	<button>Login</button>
	<button>Register</button>
	<button>Sign in with Google</button>
</form>
<span class="error">{error}</span>
