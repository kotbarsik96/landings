import { createApp } from 'vue';
import router from "@/views/index.js";
import store from "@/store/index.js";
import components from "@/components/index.js";
import App from '@/App.vue';

const app = createApp(App);

components.forEach(comp => app.component(comp.name, comp));

app.use(store).use(router).mount('#app');
