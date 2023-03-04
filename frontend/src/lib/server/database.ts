import * as mongodb from "mongodb";
import type { GameInfo } from "$lib/database-models/game-info";
import type { GameData } from "$lib/database-models/game-data";

export const collections: {
    gamesInfo?: mongodb.Collection<GameInfo>;
    gamesData?: mongodb.Collection<GameData>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("jeoparty");
    await applySchemaValidation(db);

    const gamesInfoCollection = db.collection<GameInfo>("gamesInfo");
    collections.gamesInfo = gamesInfoCollection;

    const gamesDataCollection = db.collection<GameData>("gamesData");
    collections.gamesData = gamesDataCollection;    
}

async function applySchemaValidation(db: mongodb.Db) {
    const gamesInfoSchema = {
        $gamesInfoSchema: {
            bsonType: "object",
            required: ["gameTitle", "boardType", "ownedBy", "numRounds", "numQuestionsTotal"],
            additionalProperties: false,
            properties: {
                _id: {},
                gameTitle: {
                    bsonType: "string",
                    description: "'gameTitle' is required and is a string",
                },
                boardType: {
                    bsonType: "string",
                    description: "'boardType' is required and is one of 'custom' or 'standard'",
                    enum: ["custom", "standard"],
                },
                ownedBy: {
                    bsonType: "object",
                    description: "'ownedBy' is required and is an id",
                },
                numRounds: {
                    bsonType: "int",
                    minimum: 0,
                    description: "'numRounds' is required and is an int",
                },
                numQuestionsTotal: {
                    bsonType: "int",
                    minimum: 0,
                    description: "'numQuestionsTotal' is required and is an int",
                }
            }
        }
    };

    const gamesDataSchema = {
        $gamesDataSchema: {
            bsonType: "object",
            required: ["gameTitle", "rounds"],
            additionalProperties: false,
            properties: {
                _id: {},
                gameTitle: {
                    bsonType: "string",
                    description: "'gameTitle' is required and is a string"
                },
                rounds: {
                    bsonType: ["array"],
                    minItems: 1,
                    maxItems: 5,
                    items: {
                        bsonType: ["object"],
                        required: ["num", "title", "type", "numCategories", "categories"],
                        additionalProperties: false,
                        description: "'rounds' must contain the stated fields.",
                        properties: {
                            num: {
                                bsonType: "int",
                                minimum: 1,
                                maximum: 5,
                                description: "'num' is required and is of int type",
                            },
                            title: {
                                bsonType: "string",
                                description: "'title' is required and is of string type",
                            },
                            type: {
                                bsonType: "string",
                                enum: ["normal", "final"],
                                description: "'type' is required and has value of 'normal' or 'final'",
                            },
                            numCategories: {
                                bsonType: "int",
                                minimum: 1,
                                maximum: 8,
                                description: "'numCategories' is required and is of int type",
                            },
                            categories: {
                                bsonType: ["array"],
                                minItems: 1,
                                maxItems: 8,
                                items: {
                                    bsonType: ["object"],
                                    required: ["category", "numClues", "clues"],
                                    additionalProperties: false,
                                    description: "'categories' must contain the stated fields.",
                                    properties: {
                                        category: {
                                            bsonType: "string",
                                            description: "'category' is required and is of string type",
                                        },
                                        numClues: {
                                            bsonType: "int",
                                            minimum: 1,
                                            maximum: 10,
                                            description: "'numClues' is required and is of int type",
                                        },
                                        clues: {
                                            bsonType: ["array"],
                                            minItems: 1,
                                            maxItems: 10,
                                            items: {
                                                bsonType: ["object"],
                                                required: ["value", "clue", "answer", "isDailyDouble"],
                                                additionalProperties: false,
                                                description: "'clues' must contain the stated fields.",
                                                properties: {
                                                    value: {
                                                        bsonType: "int",
                                                        description: "'value' is required and is of int type",
                                                    },
                                                    clue: {
                                                        bsonType: "string",
                                                        description: "'clue' is required and is of string type",
                                                    },
                                                    clueImage: {
                                                        bsonType: "string",
                                                        description: "'clueImage' is an optional field and should be a url",
                                                    },
                                                    answer: {
                                                        bsonType: "string",
                                                        description: "'answer' is required and is of string type",
                                                    },
                                                    isDailyDouble: {
                                                        bsonType: "boolean",
                                                        description: "'isDailyDouble' is required and is of boolean type",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    await db.command({
        collMod: "gamesInfo",
        validator: gamesInfoSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("gamesInfo", {validator: gamesInfoSchema});
        }
    });

    await db.command({
        collMod: "gamesData",
        validator: gamesDataSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("gamesData", {validator: gamesDataSchema});
        }
    })
}