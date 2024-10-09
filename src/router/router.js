import { createRouter, createWebHistory } from "vue-router";
import Main from "/src/components/Main.vue";


export const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
  ],
  history: createWebHistory(),
});
