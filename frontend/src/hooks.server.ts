import * as dotenv from "dotenv";
import { connectToDatabase } from "$lib/server/database";
import mongoose from "mongoose";
import { auth } from "$lib/server/lucia";
import { handleHooks } from "@lucia-auth/sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

const authenticate = (async ({ event, resolve }) => {
    const session = await event.locals.validate();
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

export const handle = sequence(
    handleHooks(auth),
    authenticate,
);
