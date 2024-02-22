import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get('sessionId');
	return {
        sessionId: sessionId
    }
}) satisfies LayoutServerLoad;