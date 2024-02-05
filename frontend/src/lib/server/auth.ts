import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { GitHub, Google } from 'arctic';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
} from '$env/static/private';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { Collection, MongoClient } from 'mongodb';
import { ATLAS_URI } from '$env/static/private';

export const collections: {
	users?: Collection<UserDoc>;
	sessions?: Collection<SessionDoc>;
} = {};

const client = new MongoClient(ATLAS_URI);
const db = client.db('jeoparty');

const User = db.collection('users') as Collection<UserDoc>;
collections.users = User;

const Session = db.collection('sessions') as Collection<SessionDoc>;
collections.sessions = Session;

const adapter = new MongodbAdapter(Session, User);

interface UserDoc {
	_id: string;
	github_id?: string;
	google_email?: string;
	username: string;
	hashed_password?: string;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			githubId: attributes.github_id,
			googleEmail: attributes.google_email,
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	google_email: string;
	username: string;
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
export const google = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
