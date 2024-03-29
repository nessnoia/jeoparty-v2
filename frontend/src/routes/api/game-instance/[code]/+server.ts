import { logMessage } from '$lib/logger';
import { collections } from '$lib/server/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
	try {
		const res = await collections.gameCodes?.findOne({ code: params.code });

		if (res) {
			return json({ status: 202, found: true });
		} else {
			return json({ status: 202, found: false });
		}
	} catch (err) {
		logMessage({ 'errMsg': `error while getting game instance: ${params.code}`, 'err': err })
		throw error(502, String(err));
	}
}) satisfies RequestHandler;
