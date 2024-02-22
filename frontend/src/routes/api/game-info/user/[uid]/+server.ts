import { error, json, type RequestHandler } from '@sveltejs/kit';
import { collections } from '$lib/server/database';
import { logMessage } from '$lib/logger';

export const GET = (async ({ params }) => {
	try {
		const query = { ownedBy: params.uid };
		const res = await collections.gamesInfo?.find(query).toArray();

		if (res) {
			return json({ status: 202, data: res });
		} else {
			throw error(501, `Failed to find game info by user ID: ${params.id}`);
		}
	} catch (err) {
		logMessage({ 'errMsg': `error while getting game infos by user ID: ${params.id}`, 'err': err })
		throw error(502, String(err));
	}
}) satisfies RequestHandler;
