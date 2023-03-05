import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const res = await fetch(`/api/game-data/${params.id}`, { method: 'GET' });

    if (res.ok) {
        return await res.json();
    }
};