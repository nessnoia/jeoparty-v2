import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    connected: boolean;
    constructor(name: string, character: string, colour: number) {
        super();
        this.name = name;
        this.character = character;
        this.colour = colour;
        this.score = 0;
        this.place = -1;
    }
    @type("string") name: string;
    @type("string") character: string;
    @type("number") colour: number;
    @type("number") score: number;
    @type("number") place: number;
}

export class PlayerDailyDouble extends Schema {
    constructor() {
        super();
        this.playerId = '';
        this.playerWager = 0;
        this.clueValue = -1;
    }
    @type ("string") playerId: string;
    @type("number") playerWager: number;
    @type("number") clueValue: number;
}

export class PlayerFinalJeoparty extends Schema {
    constructor(wager: number) {
        super();
        this.wager = wager;
        this.answer = "";
    }
    @type("number") wager: number;
    @type("string") answer: string;
}