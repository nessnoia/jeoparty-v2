import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'
import { firebaseConfig } from './secret';

const app = createApp(App)
export const firebaseApp = firebase.initializeApp(firebaseConfig);

app.use(router)

app.mount('#app')
