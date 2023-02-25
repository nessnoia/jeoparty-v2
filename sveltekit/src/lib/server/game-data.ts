import * as mongodb from "mongodb";
import { collections } from "$lib/server/database";
import type { GameData } from "$lib/models/game-data";

export const getGameData = async (id: string) => {
    // const query = ({ _id: new mongodb.ObjectId(id) });
    // return await collections.gamesData?.findOne(query);
    try {
        const query = ({ _id: new mongodb.ObjectId(id) });
        const res = await collections.gamesData?.findOne(query);

        if (res) {
            return JSON.parse(JSON.stringify(res));
        } else {
            return JSON.parse(JSON.stringify(`Failed to find game data: ID ${id}`))
        }
    } catch (error) {
        return {
            data: [],
            error: `Failed to find game data: ID ${id}`
        }
    }
}

export const createGameData = async (gameData: GameData) => {
    try {
        const result = await collections.gamesData?.insertOne(gameData);
  
        if (result?.acknowledged) {
            return JSON.parse(JSON.stringify({ success: 1 }));
        } else {
            return JSON.parse(JSON.stringify({status: 500, error: "Failed to create a new game." }));
        }
    } catch (error: any) {
        return JSON.parse(JSON.stringify({ status: 400, error: error.message }));
    }
}

