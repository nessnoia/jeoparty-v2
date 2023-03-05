import type * as mongodb from "mongodb";

export interface GameDataUpdater {
	gameTitle?: string;
	rounds?: RoundUpdater[];
    categories?: CategoryUpdater[];
    clues?: ClueUpdater[];
}

export interface RoundUpdater {
    roundIdx?: number;
    num?: number;
    title?: string;
    type?: string;
    numCategories?: number;
    categories?: CategoryUpdater[];
}

export interface CategoryUpdater {
    roundIdx?: number;
    categoryIdx?: number;
    category?: string;
    numClues?: number;
    clues?: ClueUpdater[];
}

export interface ClueUpdater {
    roundIdx?: number;
    categoryIdx?: number;
    clueIdx?: number;
    value?: number;
    clue?: string;
    clueImage?: string;
    answer?: string;
    isDailyDouble?: boolean;
}
