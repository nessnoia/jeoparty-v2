import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
	const user = locals.user;
	const res = await fetch(`/api/game-info/user/${user?.id}`, { method: 'GET' });

	if (res.ok) {
		return await res.json();
	}
	return {
		data: {}
	};
}) satisfies PageServerLoad;
