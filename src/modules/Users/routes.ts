import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/accounts",
    name: "PUsers",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Users/pages/PAll.vue"),
  },
  {
    path: "/accounts/:id",
    name: "PUsersSingle",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Users/pages/PSingle.vue"),
  },
  {
    path: "/accounts/add",
    name: "PUserAdd",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Users/pages/PUserAdd.vue"),
  },
  {
    path: "/accounts/cars",
    name: "PUsersCars",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Users/pages/PUserMachines.vue"),
  },
];

export default routes;
