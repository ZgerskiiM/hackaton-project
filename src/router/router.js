import { createRouter, createWebHistory } from "vue-router";
import Main from "/src/components/Main.vue";
import Support from "/src/components/Support.vue";
import Books from "/src/components/Books.vue";
import Diary from "/src/components/Diary.vue";
import Music from "/src/components/Music.vue";




export const router = createRouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/support",
      name: "Support",
      component: Support,
    },
    {
      path: "/books",
      name: "Books",
      component: Books,
    },
    {
      path: "/diary",
      name: "Diary",
      component: Diary,
    },
    {
      path: "/music",
      name: "Music",
      component: Music,
    },

  ],
  history: createWebHistory(),
});
