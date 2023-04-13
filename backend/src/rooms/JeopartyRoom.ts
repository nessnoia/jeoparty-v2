import { Room, Client } from "colyseus";
import { Host } from "./schema/Host";
import { Player } from "./schema/Player";
import { JeopartyRoomState } from "./schema/JeopartyRoomState";

export class JeopartyRoom extends Room<JeopartyRoomState> {

    onCreate (options: any) {
        this.setState(new JeopartyRoomState());

        // what messages do we need?
        // game states: join, round transition, standard round, podium, final jeoparty category, final jeopardy question, final jeopardy 
        // time start, final jeopardy time end, winners
        // we can either enable buzzers and say times up through the game states, or through separate messages from the host
        // from host: update player score, update game state, enable buzzers, final jeoparty started / timer for final jeoparty, 
        // trigger daily double, 
        // from client: buzzer pressed, character update (game joined), daily double wager submitted, final jeopardy info submitted

        // HOST MESSAGES
        this.onMessage("updateGameState", (_, data) => {
            this.state.gameState = data.state;
        });

        this.onMessage("activateBuzzers", () => {
            console.log("active")
            this.state.buzzersActive = true;
        })

        this.onMessage("deactivateBuzzers", () => {
            this.state.buzzersActive = false;
        })

        this.onMessage("updatePlayerScore", (client, data) => {
            let player = this.state.players.get(client.sessionId);
            player.score += data.score;
        });


        // CLIENT MESSAGES
        this.onMessage("buzzer", (client, data) => {
            let player = this.state.players.get(client.sessionId);
            // unsure how to handle this with how my objects are currently designed - might need to redesign those
        });
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        if (!this.state.hostJoined) {
            this.state.host = new Host();
            this.state.host.sessionId = client.sessionId;
            this.state.hostJoined = true;
        } else {
            const player = new Player(options.name, options.character, options.colour);
            this.state.players.set(client.sessionId, player);
        }
    }

    async onLeave (client: Client, consented: boolean) {
        if (this.state.host.sessionId === client.sessionId) {
            this.state.host.connected = false;
        } else {
            this.state.players.get(client.sessionId).connected = false;
        }
        try {
            if (consented) {
                throw new Error("consented leave");
            }
            await this.allowReconnection(client, 60);
            if (this.state.host.sessionId === client.sessionId) {
                this.state.host.connected = true;
                console.log(client.sessionId, "reconnect!");
            } else {
                this.state.players.get(client.sessionId).connected = true;
                console.log(client.sessionId, "reconnect!");
            }
        } catch (e) {
            if (this.state.host.sessionId === client.sessionId) {
                this.state.host = undefined;
                this.state.players = undefined;
            } else {
                this.state.players.delete(client.sessionId);
            }
            console.log(client.sessionId, "left!");
        }
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
