import { auth } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();

    if (!session) {
        throw redirect(303, '/login');
    }
}