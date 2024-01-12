import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './stores/index';

library.add(fas);

const VueApp = createApp(App);
VueApp.component('font-awesome-icon', FontAwesomeIcon);

VueApp.use(store);
VueApp.use(router);

VueApp.mount('#app');
