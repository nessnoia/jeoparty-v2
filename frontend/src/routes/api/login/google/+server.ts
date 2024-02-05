import { google } from '$lib/server/auth';
import { generateState, generateCodeVerifier } from 'arctic';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier, { scopes: ['email'] });

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10
	});

	event.cookies.set('google_code_verifier', codeVerifier, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10
	});

	throw redirect(302, url.toString());
};
