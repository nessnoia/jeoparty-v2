import { auth } from '$lib/server/lucia';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/games');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const confirmPassword = form.get('confirm-password');
		if (
			!username ||
			!password ||
			typeof username !== 'string' ||
			typeof password !== 'string'
		) {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		if (!confirmPassword || typeof confirmPassword !== 'string') {
			return fail(400, {
				message: 'Confirm password field is invalid'
			});
		}
		if (password !== confirmPassword) {
			return fail(400, {
				message: 'Passwords must be the same'
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username
				}
			});
			const session = await auth.createSession({ userId: user.userId, attributes: {} });
			locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}
};
