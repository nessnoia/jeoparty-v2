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
        this.onMessage("stateUpdate", (_, data) => {
            const host = this.state.host;
            host.gameState = data.state;
        });

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
        if (!this.state.host) {
            this.state.host = new Host();
        } else {
            console.log("player")
            const player = new Player(options.name, options.character, options.colour);
            this.state.players.set(client.sessionId, player);
        }
    }

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");

        this.state.players.delete(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
