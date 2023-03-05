import { browser } from "$app/environment";
import type { GameData } from "$lib/database-models/game-data";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    if (browser) {
        let data = window.localStorage.getItem('game-data');
        if (data) {
            let gameData = JSON.parse(data) as GameData;
            let roundNum = Number(params.num);
            return gameData.rounds[roundNum - 1];
        }
    }
};