<script lang="ts">
	import { goto } from '$app/navigation';
	import { emailLogin, emailRegister } from '$lib/auth/email-password';
	import { googleSignin } from '$lib/auth/google';

	let email = '';
	let password = '';

	let error = '';

	const login = async () => {
		let res = await emailLogin(email, password);
		if (res.success) {
			goto('/games');
		} else {
			let formatted = res.code.replace('-', ' ').replace('auth/', '');
			error = formatted.charAt(0).toUpperCase() + formatted.slice(1);
		}
	};

	const register = async () => {
		let res = await emailRegister(email, password);
		if (res.success) {
			goto('/games');
		} else {
			let formatted = res.code.replace('-', ' ').replace('auth/', '');
			error = formatted.charAt(0).toUpperCase() + formatted.slice(1);
		}
	};

	const google = async () => {
		let res = await googleSignin();
		if (res.success) {
			goto('/games');
		} else {
			let formatted = res.code.replace('-', ' ').replace('auth/', '');
			error = formatted.charAt(0).toUpperCase() + formatted.slice(1);
		}
	};
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
	<button on:click|preventDefault={login}>Login</button>
	<button on:click|preventDefault={register}>Register</button>
	<button on:click|preventDefault={google}>Sign in with Google</button>
</form>
<span class="error">{error}</span>
