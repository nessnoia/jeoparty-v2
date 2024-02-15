"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JeopartyRoom = void 0;
const colyseus_1 = require("colyseus");
const Host_1 = require("./schema/Host");
const Player_1 = require("./schema/Player");
const JeopartyRoomState_1 = require("./schema/JeopartyRoomState");
const schema_1 = require("@colyseus/schema");
class JeopartyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new JeopartyRoomState_1.JeopartyRoomState());
        // what messages do we need?
        // game states: join, round transition, standard round, podium, final jeoparty category, final jeopardy question, final jeopardy
        // time start, final jeopardy time end, winners
        // we can either enable buzzers and say times up through the game states, or through separate messages from the host
        // from host: update player score, update game state, enable buzzers, final jeoparty started / timer for final jeoparty,
        // trigger daily double,
        // from client: buzzer pressed, character update (game joined), daily double wager submitted, final jeopardy info submitted
        // HOST MESSAGES
        this.onMessage("updateGameState", (_, data) => {
            console.log("update", data.state);
            this.state.gameState = data.state;
        });
        this.onMessage("activateBuzzers", () => {
            console.log("active");
            this.state.buzzersActive = true;
            this.state.buzzerWinner = "";
        });
        this.onMessage("deactivateBuzzers", () => {
            this.state.buzzersActive = false;
        });
        this.onMessage("updatePlayerScore", (_, data) => {
            console.log("score update", data);
            let player = this.state.players.get(data.id);
            if (data.score !== undefined) {
                player.score = data.score;
            }
            if (data.clueValue !== undefined) {
                player.score += data.clueValue;
            }
            this.state.players = new schema_1.MapSchema(new Map([...this.state.players].sort((a, b) => a[1].score > b[1].score ? -1 : 1)));
            for (let i = 0; i < this.state.players.size; i++) {
                let player = Array.from(this.state.players.values())[i];
                player.place = i + 1;
            }
        });
        this.onMessage("updateDailyDoubleInfo", (_, data) => {
            this.state.dailyDouble.playerId = data.playerId;
            this.state.dailyDouble.clueValue = data.clueValue;
            this.state.dailyDouble.playerWager = -1;
        });
        this.onMessage("activateFJTimer", () => {
            console.log("active");
            this.state.fjTimerActive = true;
        });
        this.onMessage("deactivateFJTimer", () => {
            this.state.fjTimerActive = false;
        });
        // CLIENT MESSAGES
        this.onMessage("buzzer", (client) => {
            console.log("buzz");
            if (this.state.buzzerWinner === "") {
                this.state.buzzerWinner = client.sessionId;
                this.state.buzzersActive = false;
            }
        });
        this.onMessage("setBuzzerWinner", (_, data) => {
            this.state.buzzerWinner = data.buzzerWinner;
            this.state.buzzersActive = false;
        });
        this.onMessage("clearBuzzerWinner", () => {
            this.state.buzzerWinner = "";
            this.state.buzzersActive = false;
        });
        this.onMessage("updateDailyDoubleWager", (_, data) => {
            console.log("update wager", data.wager);
            this.state.dailyDouble.playerWager = data.wager;
        });
        this.onMessage("finalJeopartyWager", (client, data) => {
            console.log("final jeoparty", data);
            let finalJeoparty = new Player_1.PlayerFinalJeoparty(data.wager);
            this.state.finalJeoparty.set(client.sessionId, finalJeoparty);
        });
        this.onMessage("finalJeopartyAnswer", (client, data) => {
            console.log("final jeoparty", data);
            let finalJeoparty = this.state.finalJeoparty.get(client.sessionId);
            finalJeoparty.answer = data.answer;
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        if (!this.state.hostJoined) {
            this.state.host = new Host_1.Host();
            this.state.host.sessionId = client.sessionId;
            this.state.hostJoined = true;
        }
        else {
            const player = new Player_1.Player(options.name, options.character, options.colour);
            this.state.players.set(client.sessionId, player);
        }
    }
    onLeave(client, consented) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.host.sessionId === client.sessionId) {
                this.state.host.connected = false;
            }
            else {
                this.state.players.get(client.sessionId).connected = false;
            }
            try {
                if (consented) {
                    throw new Error("consented leave");
                }
                yield this.allowReconnection(client, 15);
                if (this.state.host.sessionId === client.sessionId) {
                    this.state.host.connected = true;
                    console.log(client.sessionId, "reconnect!");
                }
                else {
                    this.state.players.get(client.sessionId).connected = true;
                    console.log(client.sessionId, "reconnect!");
                }
            }
            catch (e) {
                if (this.state.host.sessionId === client.sessionId) {
                    this.state.host = undefined;
                    this.state.players = undefined;
                }
                else {
                    this.state.players.delete(client.sessionId);
                }
                console.log(client.sessionId, "left!");
            }
        });
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.JeopartyRoom = JeopartyRoom;
