import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, parent }) => {
	const res = await parent().then((user: any) => {
		return fetch(`/api/game-info/user/${user.userId}`, { method: 'GET' });
	});
	return await res.json();
}) satisfies PageServerLoad;
