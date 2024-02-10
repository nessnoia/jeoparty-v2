<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message?: string };
</script>

<div id="container">
	<div id="register-form">
		<h1>Create Account</h1>
		<form method="POST" use:enhance>
			<div class="form-item">
				<label for="username"> Username</label>
				<input type="text" name="username" maxlength="25" required />
			</div>

			<div class="form-item">
				<label for="password"> Password</label>
				<input type="password" name="password" maxlength="25" required />
			</div>

			<div class="form-item">
				<label for="confirm-password"> Confirm Password</label>
				<input type="password" name="confirm-password" maxlength="25" required />
			</div>

			<button id="register" type="submit">Create Account</button>
		</form>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a class="login" href="/login">Return to login</a>
	</div>
</div>

<style>
	h1 {
		font-size: var(--size-4);
		margin-top: 0;
		margin-bottom: 6%;
		color: var(--black);
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

	#register-form {
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
		text-align: left;
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

	#register {
		padding: 3%;
		margin: 3% 0 4% 0;
		font-size: var(--size-8);
		font-weight: bold;
		border: none;
		color: var(--white);
		background-color: var(--primary-600);
		border-radius: 5px;
	}

	.login {
		font-size: var(--size-9);
	}
</style>
