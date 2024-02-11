import { writable } from 'svelte/store';
import * as Colyseus from 'colyseus.js';
import { PUBLIC_COLYSEUS_URL } from '$env/static/public';

export const roomStore = writable();

export enum states {
	Buzzer = 'buzzer',
	ClueOpen = 'clueOpen',
	DailyDouble = 'dailyDouble',
	FinalJeoparty = 'finalJeoparty',
	FinalJeopartyAnswer = 'finalJeopartyAnswer',
	FinalJeopartyCategory = 'finalJeopartyCategory',
	FinalPodium = 'finalPodium',
	Join = 'join',
	RoundPodium = 'podium',
	ShowCategories = 'showCategories',
	TimesUp = 'timesUp'
}

export enum events {
	ActivateBuzzers = 'activateBuzzers',
	ActivateFJTimer = 'activateFJTimer',
	Buzzer = 'buzzer',
	DeactivateBuzzers = 'deactivateBuzzers',
	DeactivateFJTimer = 'deactivateFJTimer',
	FinalJeopartyAnswer = 'finalJeopartyAnswer',
	FinalJeopartyWager = 'finalJeopartyWager',
	UpdateDailyDoubleInfo = 'updateDailyDoubleInfo',
	UpdateDailyDoubleWager = 'updateDailyDoubleWager',
	UpdateGameState = 'updateGameState',
	UpdatePlayerScore = 'updatePlayerScore'
}

export const attemptReconnect = async () => {
	let roomId = sessionStorage.getItem('roomId');
	let sessionId = sessionStorage.getItem('sessionId');
	if (roomId !== null && sessionId !== null) {
		const client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		const room = await client.reconnect(roomId, sessionId);
		roomStore.set(room);
	}
};
