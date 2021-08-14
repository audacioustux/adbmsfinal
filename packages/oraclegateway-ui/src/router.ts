import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Result from "./components/Result.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/:tablename", name: "result", component: Result },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
