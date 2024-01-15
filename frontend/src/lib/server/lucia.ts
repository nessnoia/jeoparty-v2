import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { mongoose } from '@lucia-auth/adapter-mongoose';
import mongodb from 'mongoose';
import { dev } from '$app/environment';
// import { github, google } from "@lucia-auth/oauth/providers";
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "$env/static/private";

const userSchema = new mongodb.Schema(
	{
		_id: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	} as const,
	{ _id: false }
);

const sessionSchema = new mongodb.Schema(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		active_expires: {
			type: Number,
			required: true
		},
		idle_expires: {
			type: Number,
			required: true
		}
	} as const,
	{ _id: false }
);

const keySchema = new mongodb.Schema(
	{
		_id: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		hashed_password: String
	} as const,
	{ _id: false }
);

const User = mongodb.models.User || mongodb.model('User', userSchema);
const Session = mongodb.models.Session || mongodb.model('Session', sessionSchema);
const Key = mongodb.models.Key || mongodb.model('Key', keySchema);

export const auth = lucia({
	adapter: mongoose({ User, Session, Key }),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (userData: any) => {
		return {
			username: userData.username
		};
	}
});

// export const googleAuth = google(auth, {
//     clientId: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     redirectUri: GOOGLE_REDIRECT_URI
// });

// export const githubAuth = github(auth, {
//     clientId: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET
// })

export type Auth = typeof auth;
