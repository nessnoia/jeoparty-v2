"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JeopartyRoomState = void 0;
const schema_1 = require("@colyseus/schema");
const Host_1 = require("./Host");
const Player_1 = require("./Player");
class JeopartyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.finalJeoparty = new schema_1.MapSchema();
        this.dailyDouble = new Player_1.PlayerDailyDouble();
        this.host = new Host_1.Host();
        this.gameState = "join";
        this.buzzersActive = false;
        this.buzzerWinner = "";
        this.fjTimerActive = false;
        this.hostJoined = false;
    }
}
exports.JeopartyRoomState = JeopartyRoomState;
__decorate([
    (0, schema_1.type)({ map: Player_1.Player })
], JeopartyRoomState.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)({ map: Player_1.PlayerFinalJeoparty })
], JeopartyRoomState.prototype, "finalJeoparty", void 0);
__decorate([
    (0, schema_1.type)(Player_1.PlayerDailyDouble)
], JeopartyRoomState.prototype, "dailyDouble", void 0);
__decorate([
    (0, schema_1.type)(Host_1.Host)
], JeopartyRoomState.prototype, "host", void 0);
__decorate([
    (0, schema_1.type)("string")
], JeopartyRoomState.prototype, "gameState", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], JeopartyRoomState.prototype, "buzzersActive", void 0);
__decorate([
    (0, schema_1.type)("string")
], JeopartyRoomState.prototype, "buzzerWinner", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], JeopartyRoomState.prototype, "fjTimerActive", void 0);
