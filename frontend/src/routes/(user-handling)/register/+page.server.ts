import { lucia, collections } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

import type { Actions, PageServerLoad } from './$types';
import { logMessage } from '$lib/logger';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/games');
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await event.request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const confirmPassword = form.get('confirm-password');
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				message: 'Passwords must be the same'
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// Check if username is already used
		try {
			const query = { username: username };
			const user = await collections.users?.findOne(query);

			if (user) {
				return fail(400, {
					message: 'Username already in use'
				});
			}

			// Username does not exist in database
			const result = await collections.users?.insertOne({
				_id: userId,
				username: username,
				hashed_password: hashedPassword
			});

			if (!result) {
				return fail(500, {
					message: 'Failed to create new user. Please refresh the page and try again.'
				});
			}

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			logMessage({ 'errMsg': 'error while registering user', 'err': err })
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}
};
