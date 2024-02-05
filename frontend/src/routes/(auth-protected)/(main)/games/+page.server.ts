import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
  const user = locals.user
	const res = await fetch(`/api/game-info/user/${user?.id}`, { method: 'GET' });

	return await res.json();
}) satisfies PageServerLoad;
