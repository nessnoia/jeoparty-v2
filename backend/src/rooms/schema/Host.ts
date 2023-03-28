import { Schema, type } from "@colyseus/schema";

export class Host extends Schema {
    connected: boolean;
    constructor(sessionId: string) {
        super();
        this.sessionId = sessionId;
        this.gameState = "join";
        this.buzzersActive = false;
    }
    @type("string") sessionId: string;
    @type("string") gameState: string;
    @type("boolean") buzzersActive: boolean;
}