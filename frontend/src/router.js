import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/SignIn.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue"),
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/create-story",
      name: "create-story",
      component: () => import("./views/CreateStory.vue"),
    },
    {
      path: "/my-stories",
      name: "my-stories",
      component: () => import("./views/MyStories.vue"),
    },
    {
      path: "/manage-users",
      name: "manage-users",
      component: () => import("./views/Users.vue"),
    },
    {
      path: "/manage-categories",
      name: "manage-categories",
      component: () => import("./views/Categories.vue"),
    },
    {
      path: "/manage-configurations",
      name: "manage-configurations",
      component: () => import("./views/Configurations.vue"),
    },

    {
      path: "/manage-languages",
      name: "manage-languages",
      component: () => import("./views/Languages.vue"),
    },
    {
      path: "/manage-narratives",
      name: "manage-narratives",
      component: () => import("./views/Narratives.vue"),
    },
    {
      path: "/manage-countries",
      name: "manage-countries",
      component: () => import("./views/Countries.vue"),
    },
    {
      path: "/manage-story-roles",
      name: "manage-story-roles",
      component: () => import("./views/StoryRoles.vue"),
    },
    {
      path: "/manage-stories",
      name: "manage-stories",
      component: () => import("./views/AllStories.vue"),
    },
    {
      path: "/view-story/:id",
      name: "view-story",
      component: () => import("./views/ViewStory.vue"),
    },
    {
      path: "/edit-story/:id",
      name: "edit-story",
      component: () => import("./views/EditStory.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: () => import("./views/EditProfile.vue"),
    }
  ],
});

export default router;
