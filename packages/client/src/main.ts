import {createApp} from 'vue'
import './style.scss'
import App from './App.vue'
import router from "./router/router.ts";
import { createPinia } from 'pinia'
import i18n from './_locales/index.ts'

const app = createApp(App)
const pinia = createPinia()

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app')
