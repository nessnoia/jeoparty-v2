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
	}
	#container {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}

	#register-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 40%;
		min-width: var(--min-width);
	}

	form {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 12px;
		width: 80%;
	}

	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.form-item input {
		width: 70%;
		padding: 3px 5px;
	}

	#register {
		padding: 5px;
		margin-bottom: 20px;
		margin-top: 5px;
		font-size: var(--size-10);
	}

	.login {
		margin-top: 5px;
	}
</style>
