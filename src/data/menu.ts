import { RouteLocationRaw } from "vue-router";
import i18n from "@/plugins/i18n";

const t = i18n.global.t;

export interface IMenu {
  heading: string;
  route: RouteLocationRaw;
  svgIcon?: string;
  meta?: {
    role: string[];
  };
  withCount?: boolean;
  countName?: string;
  sub?: IMenu[];
}

export const menu: IMenu[] = [
  {
    heading:t("main_page") ,
    route: "/",
    svgIcon: "icon-main",
  },
  {
    heading: t("datas"),
    route:"/informations" ,
    svgIcon: "icon-wallet",
    meta: {
      role: ["super_admin"],
    },
  },
  {
    heading:t("accounts") ,
    route: "/accounts",
    svgIcon: "icon-user",
  },
];
