import type * as mongodb from "mongodb";

export interface GameInfo {
    _id?: mongodb.ObjectId;
	gameTitle: string;
	boardType: "custom" | "standard";
	ownedBy: mongodb.ObjectId;
	numRounds: number;
	numQuestionsTotal: number;
	tags?: [string];
}