import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import pageComps from '@/components';


const app = createApp(App);

pageComps.forEach(comp => app.component(comp.name, comp));
app.use(store).use(router).mount('#app');
