import { PUBLIC_LOGGER_URL } from '$env/static/public';
import { dev } from '$app/environment';

export const logMessage = (async (msg: any) => {
    if (dev) {
        console.log(new Date().toString(), msg);
        return
    }
    const response = await fetch(PUBLIC_LOGGER_URL, {
        method: 'POST',
        body: JSON.stringify({ msg }),
        headers: {
            'content-type': 'application/json'
        }
    }).catch((e) => {
        return
    };
    if (!response.ok) {
        console.log(new Date().toString(), msg);
    }
})
