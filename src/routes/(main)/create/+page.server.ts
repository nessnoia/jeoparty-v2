import type { Actions } from "./$types";
import type { GameInfo } from "$lib/models/game-info";
import { ObjectId } from "mongodb";
import { createGame } from "$lib/server/game-info";
import { createGameData } from "$lib/server/game-data";
import { redirect } from "@sveltejs/kit";
import type { GameData } from "$lib/models/game-data";
import { customGameData, normalGameData } from "$lib/defaults/game-data";

export const actions = {
	create: async ({ request }) => {
        const data = await request.formData();
        
        const res = await createGame(createGameInfoObject(data));
        await createGameData(createGameDataObject(res.id ?? '', data));
        if (res.id) {
            throw redirect(303, '/edit/' + res.id)
        }
        console.log(res.id);
        return { success: true, id: res.id };
    }
} satisfies Actions;


const createGameInfoObject = (data: FormData) => {
    const gameTitle = data.get('title');
    const boardType = data.get('type');
    let numRounds = 1;
    let numQuestionsTotal = 1;
    if (boardType === 'standard') {
        numRounds = 3;
        numQuestionsTotal = 2 * (6 * 5) + 1;
    }
    const gameInfo = <GameInfo>{
        gameTitle: (gameTitle && gameTitle.length > 0) ? gameTitle : 'Untitled Game',
        boardType: boardType,
        ownedBy: new ObjectId(),
        numRounds: numRounds,
        numQuestionsTotal: numQuestionsTotal,
    }
    return gameInfo;
};

const createGameDataObject = (id: string, data: FormData) => {
    const gameTitle = data.get('title');
    let gameData;
    if (data.get('type') === 'standard') {
        gameData = normalGameData;
    } else {
        gameData = customGameData;
    }
    gameData._id = new ObjectId(id);
    gameData.gameTitle = (gameTitle && gameTitle.length > 0) ? String(gameTitle) : 'Untitled Game';
    return gameData;
}