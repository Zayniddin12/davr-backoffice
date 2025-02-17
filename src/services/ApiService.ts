import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { App } from "vue";
import VueAxios from "vue-axios";

import { JwtService } from "@/services/JwtService";
import router from "@/router";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_BASE_URL;
    this.handleResponseError(ApiService.vueInstance.axios);
    this.setHeader();
  }

  public static refreshToken(axios: AxiosInstance) {
    return new Promise((resolve, reject) => {
      const refresh = JwtService.getRefresh();
      if (!refresh) {
        JwtService.destroyAccess();
        return router.push({ name: "PAuth" });
      }

      axios
        .post<{ access: string }, { data: any }>(
          import.meta.env.VITE_APP_BASE_URL + "auth/refresh",
          {}, // Body bo'sh bo'ladi
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Refresh ${refresh}`, // Refresh token headerda yuboriladi
            },
          }
        )
        .then(({ data }) => {
          JwtService.saveToken(data.access);
          ApiService.setHeader();
          resolve(data.access);
        })
        .catch(async (error) => {
          this.unsetHeader();
          localStorage.removeItem("refresh");
          localStorage.removeItem("id_token");
          JwtService.destroyAccess();
          JwtService.destroyRefresh();
          await router.push({ name: "PAuth" });
          reject(error);
        });
    });
  }

  public static handleResponseError(axios: AxiosInstance) {
    let originalRequest: AxiosRequestConfig | null = null;

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const errorResponse = error?.response;
        originalRequest = error?.config;

        if (errorResponse?.status === 401) {
          const isRefresh = originalRequest?.url?.includes(
            "auth/refresh"
          );
          if (isRefresh) {
            JwtService.destroyAccess();
            JwtService.destroyRefresh();
            await router.push({ name: "PAuth" });
            return;
          }

          if (originalRequest) {
            const newToken = await this.refreshToken(
              ApiService.vueInstance.axios
            );
            if (newToken && originalRequest?.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return ApiService.vueInstance.axios(originalRequest);
            } else {
              return Promise.reject(error);
            }
          }
        }

        if (errorResponse?.status === 404) {
          await router.replace({ name: "404" });
        }

        return Promise.reject(error);
      }
    );
  }

  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] =
      JwtService.getToken() ? `Bearer ${JwtService.getToken()}` : undefined;
    ApiService.vueInstance.axios.defaults.headers.common["Accept-Language"] =
      localStorage.getItem("locale") || "ru";
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "application/json";
  }

  public static unsetHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = ``;
  }

  public static query<T>(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return ApiService.vueInstance.axios.get(resource, {
      ...params,
      headers: { "Content-Type": "application/json", ...params.headers },
    });
  }

  public static get<R = any>(resource: string, slug = "" as string): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`, {
      headers: { "Content-Type": "application/json",  "ngrok-skip-browser-warning": "true",  },
    });
  }

  public static post<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.post(`${resource}`, data, {
      ...params,
      headers: { "Content-Type": "application/json", ...params?.headers },
    });
  }

  public static update<T = any, R = any>(
    resource: string,
    slug: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(
      `${resource}/${slug}`,
      data,
      {
        ...params,
        headers: { "Content-Type": "application/json", ...params?.headers },
      }
    );
  }

  public static put<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.put(`${resource}`, data, {
      ...params,
      headers: { "Content-Type": "application/json", ...params?.headers },
    });
  }

  public static patch<T = any, R = any>(
    resource: string,
    data?: T,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return ApiService.vueInstance.axios.patch(`${resource}`, data, {
      ...params,
      headers: { "Content-Type": "application/json", ...params?.headers },
    });
  }

  public static delete<T = any>(resource: string, params?: T): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(`${resource}`, {
      params,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default ApiService;
