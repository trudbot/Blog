import './style.scss'
import App from './App.vue'
import router from "./router/router.ts";
import { createPinia } from 'pinia'
import i18n from './_locales/index.ts'
import {createApp} from 'vue'


const app = createApp(App);
app.use(router);
app.use(i18n);
const pinia = createPinia()
app.use(pinia);
app.mount('#app');