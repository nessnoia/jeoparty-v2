import type { Actions } from "./$types";
import type { GameInfo } from "$lib/models/game-info";
import { error, redirect } from "@sveltejs/kit";
import { customGameData, normalGameData } from "$lib/defaults/game-data";

export const actions = {
	create: async ({ fetch, request }) => {
        const data = await request.formData();
        const gameInfo = createGameInfoObject(data);
        let id = '';
        const promise = await fetch('/api/game-info', {
            method: 'POST', 
            body: JSON.stringify(gameInfo),
        })
        .then(res => res.json())
        .then(res => {
            id = res.id;
            const gameData = createGameDataObject(data);
            return fetch(`/api/game-data/${id}`, {
                method: 'POST',
                body: JSON.stringify(gameData)
            });
        })
        
        if (promise.ok) {
            throw redirect(303, '/edit/' + id);
        } else {
            throw error(promise.status, promise.statusText);
        }
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
        ownedBy: data.get('uid'),
        numRounds: numRounds,
        numQuestionsTotal: numQuestionsTotal,
    }
    return gameInfo;
};

const createGameDataObject = (data: FormData) => {
    const gameTitle = data.get('title');
    let gameData;
    if (data.get('type') === 'standard') {
        gameData = normalGameData;
    } else {
        gameData = customGameData;
    }
    gameData.gameTitle = (gameTitle && gameTitle.length > 0) ? String(gameTitle) : 'Untitled Game';
    return gameData;
}