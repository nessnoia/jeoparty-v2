<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message?: string };
</script>

<div id="container">
	<div id="login-form">
		<img id="logo" src="/logo.png" alt="logo" />
		<form method="POST" use:enhance>
			<div class="form-item">
				<label for="username"> Username </label>
				<input type="text" name="username" maxlength="25" required />
			</div>
			<div class="form-item">
				<label for="password"> Password </label>
				<input type="password" name="password" maxlength="25" required />
			</div>

			<button id="login">Login</button>
		</form>

		<a class="login-link" href="/api/login/google" target="_blank">Continue with Google</a>
		<a class="login-link" href="/api/login/github" target="_blank">Continue with Github</a>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a class="register" href="/register">Create a new account</a>
	</div>
</div>

<style>
	#logo {
		width: 70%;
		height: auto;
		margin-bottom: 5%;
		filter: brightness(0) saturate(100%) invert(15%) sepia(69%) saturate(4444%)
			hue-rotate(245deg) brightness(78%) contrast(116%);
	}

	#container {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
		color: var(--black);
		background-color: var(--white);
	}

	#login-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 70%;
		max-width: 700px;
		height: 100%;
	}

	form {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 12px;
	}

	.form-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2%;
		font-size: var(--size-9);
	}

	.form-item input {
		background-color: transparent;
		padding: 1% 3%;
		border-radius: 5px;
		border: 1px solid var(--black);
		width: 70%;
		font-size: var(--size-8);
	}

	#login {
		padding: 3%;
		margin: 3% 0 4% 0;
		font-size: var(--size-8);
		font-weight: bold;
		border: none;
		color: var(--white);
		background-color: var(--primary-600);
		border-radius: 5px;
	}

	.login-link {
		/* background-color: var(--tertiary-500); */
		/* color: var(--white); */
		border: 2px solid var(--tertiary-700);
		color: var(--tertiary-700);
		font-size: var(--size-8);
		text-decoration: none;
		border-radius: 5px;
		margin: 0.5% 0;
		padding: 1.5%;
		width: 100%;
	}

	.login-link:visited {
		/* color: var(--white); */
		color: var(--tertiary-700);
	}

	.register {
		font-size: var(--size-9);
		margin-top: 3%;
	}
</style>
