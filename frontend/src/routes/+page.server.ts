import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { logMessage } from '$lib/logger';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/games');
	else throw redirect(302, '/tutorial');
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			logMessage('failed to logout, no session exists')
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);

		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/tutorial');
	}
};
