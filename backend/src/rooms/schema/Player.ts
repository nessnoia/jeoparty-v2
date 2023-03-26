import { Schema, type } from "@colyseus/schema";

export class Player extends Schema {
    constructor(name: string, character: string, colour: number) {
        super();
        this.name = name;
        this.character = character;
        this.colour = colour;
        this.score = 0;
    }
    @type("string") name: string;
    @type("string") character: string;
    @type("number") colour: number;
    @type("number") score: number;
}

export class PlayerBuzzer extends Schema {
    constructor() {
        super();
        this.didBuzz = false;
        this.buzzTime = 0;
    }
    @type("boolean") didBuzz: boolean;
    @type("number") buzzTime: number; // unsure if this one is necessary in Colyseus
}

// export class PlayerDailyDouble extends Player {
//     constructor() {
//         super();
//         this.won = false;
//         this.wager = 0;
//     }
//     @type("boolean") won: boolean;
//     @type("number") wager: number;
// }

// export class PlayerFinalJeoparty extends Player {
//     constructor() {
//         super();
//         this.wager = 0;
//         this.answer = "";
//     }
//     @type("number") wager: number;
//     @type("string") answer: string;
// }