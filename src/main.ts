import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './stores';

library.add(fas);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(store);
app.use(router);

app.mount('#app');
