import { github } from '$lib/server/auth';
import { generateState } from 'arctic';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export const GET = async ( event: RequestEvent ) => {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	throw redirect(302, url.toString());
}
