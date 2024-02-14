<script lang="ts">
	import { page } from '$app/stores';

	export let loggedIn: boolean = true;

	$: pathname = $page.url.pathname;
</script>

<nav>
	<ul>
		<li><img id="logo" src="/logo.png" alt="logo" /></li>
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
</nav>

<style>
	.hidden {
		display: none;
	}

	nav {
		height: 8vh;
		width: 100%;
		padding: 5px var(--gutter-size-nav);
		min-width: var(--min-width);
		background-color: var(--primary-600);
		display: flex;
		align-items: center;
		position: fixed;
	}

	ul {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	li {
		list-style-type: none;
		padding: 10px 5px;
	}

	li:nth-child(1) {
		padding-right: 30%;
	}

	#logo {
		height: 40px;
		width: auto;
		filter: brightness(0) invert(1);
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
</style>
