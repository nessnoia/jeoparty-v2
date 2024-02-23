import type { Actions } from "../../../$types";

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const sessionId = data.get('sessionId');
		const reconnectionToken = data.get('reconnectionToken');

		event.cookies.set('sessionId', String(sessionId), { path: '/' });
		event.cookies.set('reconnectionToken', String(reconnectionToken), { path: '/' });
	}
} satisfies Actions;