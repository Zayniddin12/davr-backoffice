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
    path: "/accounts/add",
    name: "PUserAdd",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Users/pages/PUserAdd.vue"),
  },
];

export default routes;
