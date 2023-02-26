import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '$lib/auth/firebase';
import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const emailLogin = async (email: string, password: string) => {
    try {
        let res = await signInWithEmailAndPassword(auth, email, password);
        if (res) {
            return { success: 1 };
        } else {
            return { success: 0 };
        }
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {success: 0, code: errorCode, message: errorMessage };
    }
}

export const emailRegister = async (email: string, password: string) => {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        if (res) {
            return { success: 1 };
        } else {
            return { success: 0 };
        }
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {success: 0, code: errorCode, message: errorMessage };
    }
};