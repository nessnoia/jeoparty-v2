// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('$lib/server/auth').Auth;
	type DatabaseUserAttributes = {
		username: string;
	};
	type DatabaseSessionAttributes = {};
}

/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
