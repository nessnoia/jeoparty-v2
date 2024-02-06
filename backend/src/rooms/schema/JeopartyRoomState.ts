import { MapSchema, Schema, type } from "@colyseus/schema";
import { Host } from "./Host";
import { Player, PlayerDailyDouble, PlayerFinalJeoparty } from "./Player";

export class JeopartyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: PlayerFinalJeoparty }) finalJeoparty =
    new MapSchema<PlayerFinalJeoparty>();
  @type(PlayerDailyDouble) dailyDouble: PlayerDailyDouble =
    new PlayerDailyDouble();

  @type(Host) host: Host = new Host();

  @type("string") gameState: string = "join";
  @type("boolean") buzzersActive: boolean = false;
  @type("string") buzzerWinner: string = "";
  @type("boolean") fjTimerActive: boolean = false;

  hostJoined: boolean = false;
}
