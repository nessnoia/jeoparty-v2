// import type { RequestHandler } from './$types';
// import { githubAuth, googleAuth } from '$lib/server/lucia';

// export const GET = (async ({ url, cookies }) => {
// 	const provider = url.searchParams.get('provider');
// 	if (provider === 'google') {
// 		const [url, state] = await googleAuth.getAuthorizationUrl();
// 		cookies.set('google_oauth_state', state, {
// 			path: '/',
//             httpOnly: true,
// 			maxAge: 60 * 60
// 		});
// 		return new Response(null, {
// 			status: 302,
// 			headers: {
// 				location: url.toString()
// 			}
// 		});
// 	} else if (provider === 'github') {
//         const [url, state] = await githubAuth.getAuthorizationUrl();
// 		cookies.set('github_oauth_state', state, {
// 			path: '/',
//             httpOnly: true,
// 			maxAge: 60 * 60
// 		});
// 		return new Response(null, {
// 			status: 302,
// 			headers: {
// 				location: url.toString()
// 			}
// 		});
//     }
// 	return new Response(null, {
// 		status: 400
// 	});
// }) satisfies RequestHandler;
