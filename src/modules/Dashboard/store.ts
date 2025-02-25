import { defineStore } from "pinia";
import apiService from "@/services/ApiService";
import {
  AgeDistribution,
  GenderStats,
  IAppUsageStats,
  IMainInfo,
  IResponseUsageStats,
} from "@/modules/Dashboard/types";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    data: {} as IMainInfo,
    ageStats: {} as AgeDistribution,
    genderStats: {} as GenderStats,
    dateFrom: "" as string,
    dateTo: "" as string,
    loading: true,
    gps: {
      tabs: [] as string[],
      stats: {} as Record<string, { createdAt: string; count: number }[]>,
    },
    verifier: {
      tabs: [] as string[],
      stats: {} as Record<string, { createdAt: string; count: number }[]>,
    },
    lawyer: {
      tabs: [] as string[],
      stats: {} as Record<string, { createdAt: string; count: number }[]>,
    },
  }),
  actions: {
    async fetchMainData() {
      this.loading = true;
      try {
        const response = await apiService.get<IMainInfo>("backoffice/MainInfo");
        this.data = response.data;
      } catch (error) {
        console.error("Asosiy ma'lumotlarni olishda xatolik:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAgeStats() {
      try {
        const { data } = await apiService.get(
          `/dashboard-age${
            this.dateFrom ? `/?timestamp_gte=${this.dateFrom}` : ""
          }${this.dateTo ? `&timestamp_lte=${this.dateTo}` : ""}`
        );
        this.ageStats = data;
      } catch (error) {
        console.error("Yosh statistik ma'lumotlarini olishda xatolik:", error);
      }
    },
    async fetchGenderStats() {
      try {
        const { data } = await apiService.get(
          `/dashboard-gender${
            this.dateFrom ? `/?timestamp_gte=${this.dateFrom}` : ""
          }${this.dateTo ? `&timestamp_lte=${this.dateTo}` : ""}`
        );
        this.genderStats = data;
      } catch (error) {
        console.error("Jins statistik ma'lumotlarini olishda xatolik:", error);
      }
    },
    async fetchAppUsageStats() {
      this.loading = true;
      try {
        const { data } = await apiService.get<IResponseUsageStats>(
          `/statistics/client-information/status${
            this.dateFrom ? `/?timestamp_gte=${this.dateFrom}` : ""
          }${this.dateTo ? `&timestamp_lte=${this.dateTo}` : ""}`
        );

        const services = ["gps", "verifier", "lawyer"];

        services.forEach((service) => {
          if (data[service]) {
            const tabs = Object.keys(data[service]).filter(
              (key) => data[service][key].length > 0
            );

            const stats = tabs.reduce((acc, tab) => {
              acc[tab] = data[service][tab];
              return acc;
            }, {} as Record<string, { createdAt: string; count: number }[]>);

            this[service] = { tabs, stats };
          }
        });
      } catch (error) {
        console.error("Ilova foydalanish statistik ma'lumotlarini olishda xatolik:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
