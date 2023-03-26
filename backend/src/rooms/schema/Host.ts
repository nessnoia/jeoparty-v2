import { Schema, type } from "@colyseus/schema";

export class Host extends Schema {
    @type("string") gameState: string = "join";
    @type("boolean") buzzersActive: boolean = false;
}