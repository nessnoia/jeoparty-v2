import { Schema, type } from "@colyseus/schema";

export class Host extends Schema {
    connected: boolean;
    constructor() {
        super();
        this.sessionId = "";
    }
    @type("string") sessionId: string;
}