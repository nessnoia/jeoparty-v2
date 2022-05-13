import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Firebase
import firebase from 'firebase/compat/app'
import { firebaseConfig } from './secret';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faCirclePlus, faCircleMinus)

const app = createApp(App)
export const firebaseApp = firebase.initializeApp(firebaseConfig);

app.use(router)

app.component("font-awesome-icon", FontAwesomeIcon).mount('#app')
