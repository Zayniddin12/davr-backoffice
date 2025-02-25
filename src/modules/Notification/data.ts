import { IActionType } from "@/components/Common/Dropdown/CActionsDropdown.types";


export const notificationHead = (userRole: string) => {
  const actions = [
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
      title: "files",
      key: "files",
    }
  ];

  if (
    "gps_engineer"==userRole
  ) {
    actions.push({
      title: "gps_situation",
      key: "gps_situation",
    },);
  } 
  if (
    "lawyer"==userRole
  ) {
    actions.push({
      title: "lawyer_situation",
      key: "lawyer_situation",
    });
  }
  if (
    "verifier"==userRole
  ) {
    actions.push({
      title: "verifier_situation",
      key: "verifier_situation",
    });
  }
  if (
    ["super_admin", "boss"].includes(userRole)
  ) {
    actions.push({
      title: "gps_situation",
      key: "gps_situation",
    },{
      title: "verifier_situation",
      key: "verifier_situation",
    },{
      title: "lawyer_situation",
      key: "lawyer_situation",
    });
  }
  actions.push(
    {
      title:"action",
      key:"action"
    })

  return actions;
};


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
  }
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
    title: "",
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

export const exchangeActions = (userRole: string, row: any, status?: {
  statusId: number;
  status: string;
  createdAt: string;
  updateAt: null;
  user: {
    id: number;
    fullName: string;
    role: string;
  };
}[]): IActionType[] => {
  const actions: IActionType[] = [

  ];

  if (userRole === "gps_engineer") {
    if (!status?.length) {
      actions.push({
        label: "recieve",
        value: "edit",
        icon: "icon-checked text-primary!",
        class: "hover:bg-primary/20! text-primary!",
      });
    } else if (status?.[0]?.status === "in_progress") {
      actions.push({
        label: "install",
        value: "edit",
        icon: "icon-download text-green!",
        class: "hover:bg-green/20! text-green!",
      });
    } else if (status?.[0]?.status === "canceled" && status?.[1]?.status!=="confirmed") {
      actions.push({
        label: "uninstall",
        value: "edit",
        icon: "icon-fold-download text-yellow!",
        class: "hover:bg-yellow/20! text-yellow!",
      });
    } else if(["boss", "super_admin"].includes(userRole)){
      actions.push({
        label: "more_info",
        value: "more",
        icon: "icon-info-circle !text-dark",
        class: "hover:!bg-yellow/20 !text-dark",
      });
    }
  }
  if (userRole === "verifier") {
    if (!status?.[1]?.status && status?.[0]?.status=="gps_installed") {
      actions.push({
        label: "recieve",
        value: "edit",
        icon: "icon-checked text-primary!",
        class: "hover:bg-primary/20! text-primary!",
      });
    } else if (status?.[1]?.status === "in_progress") {
      actions.push({
        label: "confirm",
        value: "edit",
        icon: "icon-checked text-green! text-lg",
        class: "hover:bg-green/20! text-green!",
      });
    } else if (status?.[1]?.status === "confirmed") {
      actions.push({
        label: "unconfirm",
        value: "edit",
        icon: "icon-close text-yellow! text-base!",
        class: "hover:bg-yellow/20! text-yellow!",
      });
    }
  }

  if (userRole === "lawyer") {
    if (!status?.[2]?.status && status?.[1]?.status=="confirmed") {
      actions.push({
        label: "recieve",
        value: "edit",
        icon: "icon-checked text-primary!",
        class: "hover:bg-primary/20! text-primary!",
      });
    } else if (status?.[2]?.status === "in_progress") {
      actions.push({
        label: "confirm",
        value: "edit",
        icon: "icon-checked text-green! text-lg",
        class: "hover:bg-green/20! text-green!",
      });
    } else if (status?.[2]?.status === "confirmed") {
      actions.push({
        label: "unconfirm",
        value: "edit",
        icon: "icon-close text-yellow! text-base!",
        class: "hover:bg-yellow/20! text-yellow!",
      });
    }
  }

  if (
    ["gps_engineer", "verifier", "lawyer"].includes(userRole) &&
    row?.statuses?.[0]?.status === "initiated"
  ) {
    actions.push({
      label: "get",
      value: "edit",
      icon: "icon-get text-red!",
      class: "hover:bg-primary/20! text-primary!",
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
