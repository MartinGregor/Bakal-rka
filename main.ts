import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './src/router';

const app = createApp(App);
app.use(createPinia());
app.use(Quasar);
app.use(router);
app.mount('#app');
