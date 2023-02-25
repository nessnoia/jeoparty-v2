import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export let firebaseConfig = {
    apiKey: "AIzaSyD6Has1EzRyOYCKcLr2C2G9-KzCE7P1trw",
    authDomain: "jeoparty-v2.firebaseapp.com",
    projectId: "jeoparty-v2",
    storageBucket: "jeoparty-v2.appspot.com",
    messagingSenderId: "350790396638",
    appId: "1:350790396638:web:026520e2f233f94f48304f",
    measurementId: "G-NQXVMCPX6L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);