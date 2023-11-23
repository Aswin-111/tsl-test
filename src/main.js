import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useEventBus } from './eventBus';
import vClickOutside from 'v-click-outside';

const app = createApp(App);
const { $on, $emit } = useEventBus();
app.config.globalProperties.$eventBus = { $on, $emit };

app.use(router);
app.use(vClickOutside); // Register the v-click-outside plugin
app.mount('#app');
