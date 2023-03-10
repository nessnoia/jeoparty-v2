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
    numDailyDoubles?: number;
    maxDailyDoubles?: number;
    categories?: CategoryUpdater[];
}

export interface CategoryUpdater {
    roundIdx?: number;
    categoryIdx?: number;
    category?: string;
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

export const sortClues = (c1: ClueUpdater, c2: ClueUpdater) => {
    let c1Value = c1.value ?? 0;
    let c2Value = c2.value ?? 0;
    if (c1Value < c2Value) return -1;
    else if (c1Value > c2Value) return 1;
    else return 0;
}