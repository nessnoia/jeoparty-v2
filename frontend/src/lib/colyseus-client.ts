import { writable } from "svelte/store"; 

export const hostClient = writable();
// might wanna store this in session storage or cookies so it stays on page refresh for players
export const playerClient = writable();