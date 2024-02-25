import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get('sessionId');
    const reconnectionToken = cookies.get('reconnectionToken');
	return {
        sessionId: sessionId,
        reconnectionToken: reconnectionToken
    }
}) satisfies LayoutServerLoad;