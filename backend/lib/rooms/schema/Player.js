"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerFinalJeoparty = exports.PlayerDailyDouble = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor(name, character, colour) {
        super();
        this.name = name;
        this.character = character;
        this.colour = colour;
        this.score = 0;
        this.place = -1;
    }
}
exports.Player = Player;
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "character", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "colour", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "score", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "place", void 0);
class PlayerDailyDouble extends schema_1.Schema {
    constructor() {
        super();
        this.playerId = "";
        this.playerWager = 0;
        this.clueValue = -1;
    }
}
exports.PlayerDailyDouble = PlayerDailyDouble;
__decorate([
    (0, schema_1.type)("string")
], PlayerDailyDouble.prototype, "playerId", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerDailyDouble.prototype, "playerWager", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerDailyDouble.prototype, "clueValue", void 0);
class PlayerFinalJeoparty extends schema_1.Schema {
    constructor(wager) {
        super();
        this.wager = wager;
        this.answer = "";
    }
}
exports.PlayerFinalJeoparty = PlayerFinalJeoparty;
__decorate([
    (0, schema_1.type)("number")
], PlayerFinalJeoparty.prototype, "wager", void 0);
__decorate([
    (0, schema_1.type)("string")
], PlayerFinalJeoparty.prototype, "answer", void 0);
