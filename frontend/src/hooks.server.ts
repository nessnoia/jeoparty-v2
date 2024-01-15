import { connectToDatabase } from '$lib/server/database';
import mongoose from 'mongoose';
import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ATLAS_URI } from '$env/static/private';

mongoose.connect(ATLAS_URI);
connectToDatabase(ATLAS_URI)
	.then(() => {
		console.log('Mongo started');
	})
	.catch((e) => {
		console.error(e);
	});

export const handleAuth = (async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth);
