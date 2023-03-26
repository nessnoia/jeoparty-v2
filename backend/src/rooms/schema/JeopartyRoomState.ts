import { MapSchema, Schema, type } from "@colyseus/schema";
import { Host } from "./Host";
import { Player } from "./Player";

export class JeopartyRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
    @type( Host ) host: Host;
}