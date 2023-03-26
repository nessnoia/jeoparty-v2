import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameRes = await fetch(`/api/game-data/${params.id}`, { method: 'GET' });
    const codeRes = await fetch('/api/game-instance', { method: 'GET' });

    if (gameRes.ok && codeRes.ok) {
        return {
            game: await gameRes.json(),
            code: await codeRes.json()
        }
    }
};