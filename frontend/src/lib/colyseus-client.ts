import { writable } from "svelte/store"; 
import * as Colyseus from 'colyseus.js';
import { PUBLIC_COLYSEUS_URL } from "$env/static/public";

export const hostClient = writable();
// might wanna store this in session storage or cookies so it stays on page refresh for players
export const playerClient = writable();

export const roomStore = writable();

export const attemptReconnect = async () => {
    let roomId = sessionStorage.getItem('roomId');
    let sessionId = sessionStorage.getItem('sessionId');
    console.log(roomId, sessionId)
    if (roomId !== null && sessionId !== null) {
        const client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
        const room = await client.reconnect(roomId, sessionId);
        roomStore.set(room);
    }
}