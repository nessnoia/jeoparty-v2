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
	}

	#container {
		display: flex;
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
	}

	.form-item input {
		width: 70%;
	}

	#register {
		margin: 3% 0 4% 0;
		background-color: var(--primary-600);
	}

	.login {
		font-size: var(--size-9);
	}
</style>
