<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // tosUrl: '<your-tos-url>',
    // privacyPolicyUrl: function() {
    //     window.location.assign('<your-privacy-policy-url>');
    // }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

</script>

<template>
    <div>
        <h1>Jeoparty</h1>
        <input type="email" :value="email" placeholder="Email..."/>
        <input type="password" :value="password" placeholder="Password..."/>
        <button>Sign In</button>
        <button>Create Account</button>
        <div id="firebaseui-auth-container"></div>
    </div>
</template>