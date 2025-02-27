import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthRoutes from "@/modules/Auth/routes";
import DashboardRoutes from "@/modules/Dashboard/routes";
import NotificationRoutes from "@/modules/Notification/routes";
import UserRoutes from "@/modules/Users/routes";
import { JwtService } from "@/services/JwtService";
import { useAuthStore } from "@/modules/Auth/stores";
import { computed } from "vue";

const routes: Array<RouteRecordRaw> = [
  ...AuthRoutes,
  ...DashboardRoutes,
  ...UserRoutes,
  ...NotificationRoutes,
  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "error",
    },
    component: () => import("@/layout/Error/LError.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);

  if (["404", "403", "500"].includes((to.name || "").toString())) {
    return true;
  }

  if (JwtService.getToken() && !Object.keys(user.value)?.length) {
    await authStore.fetchUserData();
  }

  // Faqat super_admin yoki boss PDashboard'ga kira oladi
  if (to.name === "PDashboard") {
    if (!["super_admin", "boss"].includes(user.value?.role)) {
      return { path: "/informations" }; // Not Found sahifasiga yo'naltirish
    }
  }

  if (Object.keys(user.value)?.length && to.name === "PAuth") {
    return { name: "PDashboard" };
  }

  if (to.name === "PrivacyPolicy") return true;

  if (
    to.name !== "PAuth" &&
    !JwtService.getToken() &&
    !Object.keys(user.value)?.length
  ) {
    return { name: "PAuth" };
  } else {
    return true;
  }
});

export default router;
