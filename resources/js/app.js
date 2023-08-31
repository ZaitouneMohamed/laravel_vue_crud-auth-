// import './bootstrap';
// import { createApp } from 'vue';

// const app = createApp({});

// import ExampleComponent from './components/ExampleComponent.vue';

// app.component('example-component', ExampleComponent);

// app.mount('#app');

import { createApp } from 'vue';
import App from './app';
import router from './Router';

const app = createApp(App);
app.use(router);
app.mount('#app');
