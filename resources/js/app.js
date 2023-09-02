import { createApp } from "vue";
import { App } from "./app";
import router from "./Router";

const app = createApp(App);
app.use(router);
app.mount("#app");
