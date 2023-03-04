import type * as mongodb from "mongodb";

export interface GameData {
    _id?: mongodb.ObjectId;
	gameTitle?: string;
	rounds: Round[];
}

export interface Round {
    num: number;
    title: string;
    type: string;
    numCategories: number;
    categories: Category[];
}

export interface Category {
    category: string;
    numClues: number;
    clues: Clue[];
}

export interface Clue {
    value: number;
    clue: string;
    clueImage?: string;
    answer: string;
    isDailyDouble: boolean;
}
