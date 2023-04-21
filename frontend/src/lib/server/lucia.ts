import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import adapter from "@lucia-auth/adapter-mongoose";
import mongoose from 'mongoose';
import { dev } from "$app/environment";
// import { github, google } from "@lucia-auth/oauth/providers";
// import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "$env/static/private";

const userSchema = new mongoose.Schema({
        _id: {
            type: String
        },
        email: {
            type: String
        }
    },
    { _id: false }
);

const sessionSchema = new mongoose.Schema({
        _id: {
            type: String
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
    },
    { _id: false }
);

const keySchema = new mongoose.Schema({
        _id: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        },
        hashed_password: String,
        primary_key: {
            type: Boolean,
            required: true
        },
        expires: Number
    },
    { _id: false }
);

const User = mongoose.models.auth_user || mongoose.model('auth_user', userSchema);
const Session = mongoose.models.auth_session || mongoose.model('auth_session', sessionSchema);
const Key = mongoose.models.auth_key || mongoose.model('auth_key', keySchema);

export const auth = lucia({
    User, Session, Key,
	adapter: adapter(mongoose),
	env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    transformDatabaseUser: (userData: any) => {
		return {
			userId: userData.id,
			email: userData.email
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