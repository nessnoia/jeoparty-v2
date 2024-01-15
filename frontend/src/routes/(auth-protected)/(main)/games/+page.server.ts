import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load = (async ({ fetch, parent }) => {
  const userId = await parent()
	const res = await fetch(`/api/game-info/user/${userId}`, { method: 'GET' });
	return await res.json();
}) satisfies PageServerLoad;
