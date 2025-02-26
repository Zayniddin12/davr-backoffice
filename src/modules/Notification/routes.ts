import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/informations",
    name: "PNotification",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Notification/page/PNotification.vue"),
  },
  {
    path: "/informations/add",
    name: "PNotificationAdd",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Notification/page/PNotificationAdd.vue"),
  },
];

export default routes;
