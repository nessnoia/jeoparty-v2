import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";

export const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        let res = await signInWithPopup(auth, provider);
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