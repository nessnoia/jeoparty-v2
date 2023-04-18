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