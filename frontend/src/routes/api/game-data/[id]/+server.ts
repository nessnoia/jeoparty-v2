import * as mongodb from 'mongodb';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { collections } from '$lib/server/database';

export const GET = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesData?.findOne(query);

        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, `Failed to find game data by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const POST = (async ({ params, request }) => {
    try {
        const gameData = await request.json();
        gameData._id = new mongodb.ObjectId(params.id);
        const result = await collections.gamesData?.insertOne(gameData);
  
        if (result?.acknowledged) {
            return json({ status: 202, id: result?.insertedId });
        } else {
            throw error(501, `Failed to create a new game by ID: ${result?.insertedId}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesInfo?.deleteOne(query);

        if (res) {
            return json({ status: 202 })
        } else {
            throw error(501, `Failed to delete game data by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;