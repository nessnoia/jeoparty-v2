// import { getGameData } from '$lib/server/game-data';
// import { getGame } from '$lib/server/game-info';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ fetch, params }) => {
    const infoRes = await fetch(`/api/game-info/${params.id}`, { method: 'GET' });
    const dataRes = await fetch(`/api/game-data/${params.id}`, { method: 'GET' });
    return {
        gameData: await dataRes.json(),
        games: await infoRes.json()
    };
}) satisfies PageServerLoad;