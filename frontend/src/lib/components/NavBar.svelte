<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let loggedIn: boolean = true;
	let showNavMobile = true;

	$: pathname = $page.url.pathname;
</script>

<nav>
	<img
		id="logo"
		src="/logo.png"
		alt="logo"
		on:click={() => goto('/games')}
		on:keydown={() => goto('/games')}
	/>
	<ul class:toggle-hidden={showNavMobile} class:logged-in={loggedIn}>
		<li class:hidden={!loggedIn} class:active={pathname === '/games'}>
			<a href="/games">Your Games</a>
		</li>
		<li class:hidden={!loggedIn} class:active={pathname === '/create'}>
			<a href="/create">Create</a>
		</li>
		<li class:hidden={!loggedIn} class:active={pathname === '/tutorial'}>
			<a href="/tutorial">How to Play</a>
		</li>
		<li>
			{#if loggedIn}
				<form method="post" action="/?/logout">
					<input type="submit" class="button" value="Sign out" />
				</form>
			{:else}
				<a href="/login">Login</a>
			{/if}
		</li>
	</ul>
	<button class="mobile-only" on:click={() => (showNavMobile = !showNavMobile)}
		><img src="/icons/caret-down.svg" alt="toggle nav menu" /></button
	>
</nav>

<style>
	.hidden,
	.mobile-only {
		display: none;
	}

	nav {
		height: 8vh;
		width: 100%;
		padding: 0 5%;
		min-height: 50px;
		background-color: var(--primary-600);
		display: flex;
		align-items: center;
		position: fixed;
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	ul.logged-in {
		justify-content: space-between;
	}

	li {
		list-style-type: none;
		padding: 10px 5px;
	}

	#logo {
		height: 40px;
		width: auto;
		filter: brightness(0) invert(1);
		padding-right: 30%;
	}

	.active {
		border-bottom: 3px var(--secondary-500) solid;
	}

	a,
	a:visited,
	input {
		text-decoration: none;
		color: var(--white);
		font-size: var(--size-10);
		font-family: Arial, Helvetica, sans-serif;
	}

	.active a {
		font-weight: bold;
	}

	.button {
		background-color: transparent;
		outline: none;
		border: none;
	}

	.button:hover {
		cursor: pointer;
	}

	@media only screen and (max-width: 750px) {
		#logo {
			padding: 0;
		}

		.mobile-only {
			display: block;
		}

		.toggle-hidden {
			display: none;
		}

		ul {
			position: absolute;
			right: 0;
			top: 8vh;
			background-color: var(--primary-500);
			padding: 2% 5%;
			justify-content: flex-end;
		}

		ul.logged-in {
			justify-content: space-between;
		}

		li {
			font-size: var(--size-8);
		}

		nav {
			justify-content: space-between;
		}

		button {
			background-color: transparent;
			padding: 2%;
		}

		button img {
			width: 30px;
			height: 30px;
			filter: brightness(0) invert(1);
		}
	}
</style>
