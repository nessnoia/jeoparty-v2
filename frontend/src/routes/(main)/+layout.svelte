<script lang="ts">
	import { page } from '$app/stores';

	let pathname = $page.url.pathname;
</script>

<nav>
	<ul>
		<li><img class="logo" src="logo.png" alt="logo" /></li>
		<li class:active={pathname === '/games'}><a href="/games">View Your Games</a></li>
		<li class:active={pathname === '/create'}><a href="/create">Create New</a></li>
		<li class:active={pathname === '/tutorial'}><a href="/tutorial">How to Play</a></li>
		<li class:active={pathname === '/settings'}>
			<a href="/settings"><img class="settings" src="/icons/gear.svg" alt="settings" /></a>
		</li>
	</ul>
</nav>

<slot />

<style>
	nav {
		height: 10%;
		padding-right: 50px;
		padding-top: 10px;
		margin-bottom: 40px;
		min-width: 700px;
	}

	ul {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	li {
		list-style-type: none;
		padding: 10px 20px;
	}

	.logo {
		height: 40px;
		width: auto;
	}

	.active {
		background-color: var(--black);
		text-transform: uppercase;
	}

	a {
		text-decoration: none;
		color: var(--black);
	}

	a:visited {
		color: var(--black);
	}

	.active a {
		color: var(--white);
		font-weight: bold;
	}

	.settings {
		height: 20px;
		width: auto;
	}
</style>
