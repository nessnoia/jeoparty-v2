// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("$lib/server/lucia").Auth;
	type UserAttributes = {
        username: string;
    };
}

/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
        interface Locals {
            auth: import("lucia-auth").AuthRequest;
        }
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
