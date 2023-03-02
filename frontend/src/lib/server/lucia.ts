import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import mongoose from 'mongoose';
import { dev } from "$app/environment";

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
        primary: {
            type: Boolean,
            required: true
        },
        expires: Number
    },
    { _id: false }
);

const User = mongoose.models.user || mongoose.model('user', userSchema);
const Session = mongoose.models.session || mongoose.model('session', sessionSchema);
const Key = mongoose.models.key || mongoose.model('key', keySchema);

export const auth = lucia({
    User, Session, Key,
	adapter: adapter(mongoose),
	env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
		return {
			userId: userData.id,
			email: userData.email
		};
	}
});

export type Auth = typeof auth;