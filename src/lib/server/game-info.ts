import * as mongodb from "mongodb";
import { collections } from "$lib/server/database";
import type { GameInfo } from "$lib/models/game-info";


export const getGame = async (id: string) => {
    try {
        const query = { _id: new mongodb.ObjectId(id) };
        const gameInfo = await collections.gamesInfo?.findOne(query);
        if (gameInfo) {
            return JSON.parse(JSON.stringify(gameInfo));
        } else {
            return JSON.parse(JSON.stringify({ error: `Failed to find game info: ID ${id}` }));
        }
    } catch (error: any) {
        return JSON.parse(JSON.stringify({ status: 404, error: `Failed to find game info: ID ${id}` }));
    }
}

export const getGames = async () => {
    try {
        const gamesInfo = await collections.gamesInfo?.find({}).toArray();
        if (gamesInfo) {
            return JSON.parse(JSON.stringify(gamesInfo));
        }
    } catch (error: any) {
        return JSON.parse(JSON.stringify({ status: 500, error: error.message }));
    }
}

export const createGame = async (gameInfo: GameInfo) => {
    try {
        const result = await collections.gamesInfo?.insertOne(gameInfo);
  
        if (result?.acknowledged) {
            return JSON.parse(JSON.stringify({ id: result.insertedId }));
        } else {
            return JSON.parse(JSON.stringify({ status: 500, error: "Failed to create a new game." }));
        }
    } catch (error: any) {
        return JSON.parse(JSON.stringify({ status: 400, error: error.message }));
    }
}

