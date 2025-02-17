import { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/accounts",
    name: "PNotification",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Notification/page/PNotification.vue"),
  },
  {
    path: "/accounts/add",
    name: "PNotificationAdd",
    meta: {
      layout: "default",
    },
    component: () => import("@/modules/Notification/page/PNotificationAdd.vue"),
  },
  {
    path: "/accounts/:id/edit",
    name: "PNotificationEdit",
    meta: {
      layout: "default",
    },
    component: () =>
      import("@/modules/Notification/page/PNotificationEdit.vue"),
  },
];

export default routes;
