import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: typeof axios;
  }
}

const app = createApp(App);

// const router = VueRouter.createRouter({
//   // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//   history: VueRouter.createWebHashHistory(),
//   routes, // short for `routes: routes`
// });

app.use(router);
app.config.globalProperties.$http = axios;

app.mount("#app");
