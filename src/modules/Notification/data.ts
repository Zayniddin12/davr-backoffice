import { IActionType } from "@/components/Common/Dropdown/CActionsDropdown.types";

export const notificationHead =[
  {
    title: "№",
    key: "id",
  },
  {
    title: "name",
    key: "name",
  },
  {
    title: "pinfl",
    key: "pinfl",
  },
  {
    title: "number_of_car",
    key: "number_of_car",
  },
  {
    title: "vin_code",
    key: "vin_code",
  },
  {
    title: "mark_of_car",
    key: "mark_of_car",
  },
  {
    title: "model_of_car",
    key: "model_of_car",
  },
  {
    title: "user_id",
    key: "user_id",
  },
  {
    title: "filial_of_bank",
    key: "filial_of_bank",
  },
  {
    title: "situation",
    key: "situation",
  },
  {
    title: "",
    key: "action",
  }
];

export const usersHead = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "connection_name",
    key: "name",
  },
  {
    title: "username",
    key: "username",
  },
  {
    title: "role",
    key: "role",
  },
  {
    title: "date_create",
    key: "date_create",
  },
  {
    title: "",
    key: "action",
  },
];
export const mainModelHead = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "brand_name",
    key: "name",
  },
  {
    title: "models",
    key: "mark",
  },
  {
    title: "added_at",
    key: "added_at",
  },
  {
    title: "actions",
    key: "action",
  },
];

export const modelHead = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "model_name",
    key: "name",
  },
  {
    title: "model_mark",
    key: "mark",
  },
  {
    title: "added_at",
    key: "added_at",
  },
  {
    title: "actions",
    key: "action",
  },
];

export const chargerHead = [
  {
    title: "№",
    key: "id",
  },
  {
    title: "charger_name",
    key: "name",
  },
  {
    title: "category",
    key: "category",
  },
  {
    title: "added_at",
    key: "added_at",
  },
  {
    title: "actions",
    key: "action",
  },
];

export const exchangeActions = (userRole: string, row: any): IActionType[] => {
  const actions: IActionType[] = [
    {
      label: "delete",
      value: "deleteExchange",
      icon: "icon-trash !text-red",
      class: "hover:!bg-red/20 !text-red",
    },
  ];

  if (
    ["gps_engineer", "verifier", "lawyer"].includes(userRole) &&
    row?.statuses?.[0]?.status === "initiated"
  ) {
    actions.push({
      label: "get",
      value: "getExchange",
      icon: "icon-get !text-red",
      class: "hover:!bg-primary/20 !text-primary",
    });
  }

  return actions;
};


export const tabListLanguage = [
  {
    value: "uz",
    label: "O'zbekcha",
    icon: "/images/svg/flags/o'z.svg",
  },
  {
    value: "en",
    label: "English",
    icon: "/images/svg/flags/uk.svg",
  },
  {
    value: "ru",
    label: "Русский",
    icon: "/images/svg/flags/ru.svg",
  },
];
