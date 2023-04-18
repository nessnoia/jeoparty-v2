import { MapSchema, Schema, type } from "@colyseus/schema";
import { Host } from "./Host";
import { Player, PlayerDailyDouble, PlayerFinalJeoparty } from "./Player";

export class JeopartyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
    // @type({ map: PlayerFinalJeoparty }) finalJeoparty: MapSchema<PlayerFinalJeoparty>;
    // For some reason, listening to events on the client side doesn't like when this object is just 
    // the standalone object, so instead it's going to be stored in a map, even though this is kind of
    // counterintuitive.
    @type( PlayerDailyDouble ) dailyDouble: PlayerDailyDouble = new PlayerDailyDouble();

    @type( Host ) host: Host = new Host();

    @type("string") gameState: string = "join";
    @type("boolean") buzzersActive: boolean = false;
    @type("string") buzzerWinner: string = "";

    hostJoined: boolean = false; 
}