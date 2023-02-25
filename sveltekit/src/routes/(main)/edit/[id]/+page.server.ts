import { getGameData } from '$lib/server/game-data';
import { getGame } from '$lib/server/game-info';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ params }) => {
    return {
        gameData: await getGameData(params.id),
        games: await getGame(params.id)
    };
}) satisfies PageServerLoad;