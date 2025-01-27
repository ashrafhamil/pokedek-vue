import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import { inject } from '@vercel/analytics';

// if (import.meta.env.PROD) {
//     inject(); // Enable only in production
// }
inject();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
