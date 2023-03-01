import type { PageServerLoad } from './$types';
 
export const load = (async ({ fetch }) => {
    const res = await fetch(`/api/game-info`, { method: 'GET' });
    return await res.json();
}) satisfies PageServerLoad;
