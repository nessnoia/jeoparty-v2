import { getGames } from '$lib/server/game-info';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async () => {
    let data = await getGames();
    if (data) {
        return {
            games: data,
        };
    }
}) satisfies PageServerLoad;
