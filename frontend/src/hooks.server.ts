import { connectToDatabase } from "$lib/server/database";
import mongoose from "mongoose";
import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { ATLAS_URI } from "$env/static/private";

const authenticate = (async ({ event, resolve }) => {
    const session = await event.locals.auth.validate();
    if (!session && (!event.url.pathname.startsWith('/login') 
                 && !event.url.pathname.startsWith('/register') 
                 && !event.url.pathname.startsWith('/api'))) {
        throw redirect(303, '/login');
    } else if (session && (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register'))) {
        throw redirect(303, '/games');
    }
     
    // If the request is still here, just proceed as normally
    const result = await resolve(event, {
        transformPageChunk: ({ html }) => html
    });
    return result;
}) satisfies Handle;

mongoose.connect(ATLAS_URI);
connectToDatabase(ATLAS_URI).then(() => {
	console.log('Mongo started');
}).catch(e => {console.error(e)})

export const handleAuth = (async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(
    handleAuth,
    authenticate,
);
