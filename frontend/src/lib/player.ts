export interface Player {
	name: string;
	character: string;
	characterColour: number;
	score: number;
	place: number;
}

export interface PlayerFinalJeoparty {
	// name needs to be optional because it gets populated after the map is created
	name?: string;
	wager: number;
	answer: string;
}
