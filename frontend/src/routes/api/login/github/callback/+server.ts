import { collections, github, lucia } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';

import type { RequestEvent } from '@sveltejs/kit';
import { logMessage } from '$lib/logger';

export const GET = async (event: RequestEvent) => {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();
		const existingUser = await collections.users?.findOne({ github_id: githubUser.id });

		if (existingUser) {
			const session = await lucia.createSession(existingUser._id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(15);
			await collections.users?.insertOne({
				_id: userId,
				github_id: githubUser.id,
				username: githubUser.login
			});
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (err) {
		// the specific error message depends on the provider
		if (err instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		logMessage({ 'errMsg': 'error while logging in via github', 'err': err })
		return new Response(null, {
			status: 500
		});
	}
};

interface GitHubUser {
	id: string;
	login: string;
}
