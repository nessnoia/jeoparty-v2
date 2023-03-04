import * as mongodb from 'mongodb';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { collections } from '$lib/server/database';
import type { GameDataUpdater } from '$lib/update-models/game-data';

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

export const PUT = (async ({params, request}) => {
    try {
        const data = await request.json();
        // const gameDataUpdate = JSON.parse(data.slice(1)) as GameDataUpdater;
        const gameDataUpdate = JSON.parse(data) as GameDataUpdater;
        const filter = ({ _id: new mongodb.ObjectId(params.id) });

        let pushUpdates: Record<string, any> = {};
        let setUpdates: Record<string,any> = {};

        if (gameDataUpdate.gameTitle) {
            let gameSetUpdates: Record<string, any> = {};
            gameSetUpdates['gameTitle'] = gameDataUpdate.gameTitle;
            setUpdates['game'] = gameSetUpdates;
        }
        
        if (gameDataUpdate.rounds) {
            let roundSetUpdates: Record<string, any> = {};
            let roundPushUpdates: Record<string, any> = {};
            for (let round of gameDataUpdate.rounds) {
                let roundIdx = round.roundIdx;

                // Delete fields after storing them so we can directly save the object to database without these.
                delete round.roundIdx;

                if (roundIdx !== undefined) {
                    for (const [fieldKey, fieldValue] of Object.entries(round)) {
                        let roundQuery = 'rounds.' + roundIdx + '.' + fieldKey;
                        roundSetUpdates[roundQuery] = fieldValue;
                    }
                } else {
                    let roundQuery = 'rounds';
                    if (!pushUpdates[roundQuery]) {
                        roundPushUpdates[roundQuery] = [round];
                    } else {
                        roundPushUpdates[roundQuery].push(round);
                    }
                }
            }
            setUpdates['round'] = roundSetUpdates;
            pushUpdates['round'] = roundPushUpdates;
        }

        if (gameDataUpdate.categories) {
            let categorySetUpdates: Record<string, any> = {};
            let categoryPushUpdates: Record<string, any> = {};
            for (let category of gameDataUpdate.categories) {
                let roundIdx = category.roundIdx;
                let categoryIdx = category.categoryIdx;

                // Delete fields after storing them so we can directly save the object to database without these.
                delete category.roundIdx;
                delete category.categoryIdx;

                // If the category has an index, then we're updating it's info. If not, then it's a new category
                // and we can just push the data.
                if (categoryIdx !== undefined) {
                    for (const [fieldKey, fieldValue] of Object.entries(category)) {
                        let categoryQuery = 'rounds.' + roundIdx + '.categories.' + categoryIdx + '.' + fieldKey; 
                        categorySetUpdates[categoryQuery] = fieldValue;
                    }
                } else {
                    let categoryQuery = 'rounds.' + roundIdx + '.categories';
                    if (!categoryPushUpdates[categoryQuery]) {
                        categoryPushUpdates[categoryQuery] = [category];
                    } else {
                        categoryPushUpdates[categoryQuery].push(category);
                    }
                }   
            }
            setUpdates['category'] = categorySetUpdates;
            pushUpdates['category'] = categoryPushUpdates;
        }

        if (gameDataUpdate.clues) {
            let clueSetUpdates: Record<string, any> = {};
            let cluePushUpdates: Record<string, any> = {};
            for (let clue of gameDataUpdate.clues) {
                let roundIdx = clue.roundIdx;
                let categoryIdx = clue.categoryIdx;
                let clueIdx = clue.clueIdx;

                // Delete fields after storing them so we can directly save the object to database without these.
                delete clue.roundIdx;
                delete clue.categoryIdx;
                delete clue.clueIdx;

                // If the clue has an index, then we're updating it's info. If not, then it's a new clue
                // and we can just push the data.
                // TODO: Maybe consider moving the set logic into the individual modules and storing the to save data
                // in the query form. I'm not sure if this would be better or worse though, but might be worth looking
                // at.
                if (clueIdx !== undefined) {
                    for (const [fieldKey, fieldValue] of Object.entries(clue)) {
                        let clueQuery = 'rounds.' + roundIdx + '.categories.' + categoryIdx + '.clues.' + clueIdx + '.' + fieldKey;
                        clueSetUpdates[clueQuery] = fieldValue;
                    }
                } else {
                    let clueQuery = 'rounds.' + roundIdx + '.categories.' + categoryIdx + '.clues';
                    if (!cluePushUpdates[clueQuery]) {
                        cluePushUpdates[clueQuery] = [clue];
                    } else {
                        cluePushUpdates[clueQuery].push(clue);
                    }
                }   
            }
            setUpdates['clue'] = clueSetUpdates;
            pushUpdates['clue'] = cluePushUpdates;
        }
        
        const getQuery = (levelName: string, type: string, queryRecord: Record<string, any>) => {
            let query: Record<string, any> = {};
            for (let key in queryRecord[levelName]) {
                if (type === 'push') {
                    query[key] = { $each: queryRecord[levelName][key] };
                } else if (type === 'set') {
                    for (let fieldKey in queryRecord[levelName][key]) {
                        let newKey = key + fieldKey;
                    }
                    
                    console.log(key, queryRecord[levelName])
                    query[key] = queryRecord[levelName][key];
                }
            }
            return query;
        }
        
        console.log("push: " + JSON.stringify(pushUpdates), "set: " + JSON.stringify(setUpdates))
        // We have to update them individually because it won't allow updating of intermediate and nested
        // paths at the same time. But, to avoid an extra call when necessary, update game info with rounds.
        const gameSetQuery = getQuery('game', 'set', setUpdates);
        const roundSetQuery = getQuery('round', 'set', setUpdates);
        const roundPushQuery = getQuery('round', 'push', pushUpdates);
        let roundRes;
        if (Object.keys(gameSetQuery).length > 0 || Object.keys(roundSetQuery).length > 0 || Object.keys(roundPushQuery).length > 0) {
            const setQuery = {...gameSetQuery, ...roundSetQuery};
            console.log(setQuery)
            // merge the two objects before passing them into the query
            roundRes = await collections.gamesData?.updateOne(filter, { $set: setQuery, $push: roundPushQuery });
        } else {
            roundRes = {};
        }

        const categorySetQuery = getQuery('category', 'set', setUpdates);
        const categoryPushQuery = getQuery('category', 'push', pushUpdates);
        let categoryRes;
        if (Object.keys(categorySetQuery).length > 0 || Object.keys(categoryPushQuery).length > 0) {
            categoryRes = await collections.gamesData?.updateOne(filter, { $set: categorySetQuery, $push: categoryPushQuery });
        } else {
            categoryRes = {};
        }

        const clueSetQuery = getQuery('clue', 'set', setUpdates);
        const cluePushQuery = getQuery('clue', 'push', pushUpdates);
        let clueRes;
        if (Object.keys(clueSetQuery).length > 0 || Object.keys(cluePushQuery).length > 0) {
            clueRes = await collections.gamesData?.updateOne(filter, { $set: clueSetQuery, $push: cluePushQuery });
        } else {
            clueRes = {};
        }
        
        if (roundRes && categoryRes && clueRes) {
            return json({ status: 202 })
        } else {
            throw error(501, `Failed to update game data by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;