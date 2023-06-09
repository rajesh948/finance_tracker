import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify/vuetify.plugin";
import store from "./store";
import router from "./router";

import "@/css/style.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
