import * as mongodb from 'mongodb';
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { collections } from '$lib/server/database';

export const GET = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesInfo?.findOne(query);

        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, `Failed to find game info by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;