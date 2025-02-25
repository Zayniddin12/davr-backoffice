<script setup lang="ts">
import CDropdown from "@/components/Common/Dropdown/CDropdown.vue";
import { IActionType } from "@/components/Common/Dropdown/CActionsDropdown.types";

interface Props {
  list: IActionType[];
  status?: {
    statusId: number;
    status: string;
    createdAt: string;
    updateAt: null;
    user: {
      id: number;
      fullName: string;
      role: string;
    };
  }[];
  role?: string;
  id: number;
}
const props = defineProps<Props>();

const emit = defineEmits(["edit", "delete", "more"]);

// User role propsga teng bo'lgan statuslarni emit qilish
const emitEditStatus = () => {
  if (!props.status || props.status.length === 0) {
    emit("edit", "in_progress", props.id);
    return;
  }

  switch (props.role) {
    case "gps_engineer":
      if (!props.status[0] || props.status[0].status === "in_progress") {
        emit("edit", "gps_installed", props.id);
      } else if (props.status[0].status === "gps_installed") {
        emit("edit", "gps_not_installed", props.id);
      }
      break;

    case "verifier":
      if (!props.status?.[1]?.status) {
        emit("edit", "in_progress", props.id);
      } else if (props.status[1].status === "in_progress") {
        emit("edit", "confirmed", props.id);
      } else if (props.status[1].status === "confirmed") {
        emit("edit", "canceled", props.id);
      }
      break;

    case "lawyer":
      if (!props.status?.[2]?.status) {
        emit("edit", "in_progress", props.id);
      } else if (props.status[2].status === "in_progress") {
        emit("edit", "confirmed", props.id);
      } else if (props.status[2].status === "confirmed") {
        emit("edit", "canceled", props.id);
      }
      break;

    default:
      // Boshqa rollar uchun qo'shimcha logika qo'shishingiz mumkin
      break;
  }
};


</script>

<template>
  <CDropdown class="w-7 mr-auto">
    <template #head>
      <div
        class="h-6 w-6 ml-auto nr-5 flex items-center justify-center gap-2.5 rounded-md bg-transparent group hover:bg-gray focus:bg-gray cursor-pointer transition-300"
      >
        <i
          class="icon-icon-3dot text-2xl text-gray-200 group-hover:text-dark duration-300"
        />
      </div>
    </template>

    <template #default>
      <div class="flex flex-col bg-white rounded-lg shadow-dropdown">
        <template v-for="(item, index) in list" :key="index">
          <div
            @click="
              item.value === 'edit'
                ? emitEditStatus() :item.value === 'more'? emit('more', props.status)
                : emit('delete', props.status)
            "
            class="min-w-[158px] h-11 cursor-pointer flex items-center p-3 gap-2 hover:bg-gray/40 transition-300 group"
            :class="item.class"
          >
            <i :class="item.icon" class="text-xl transition-300" />
            <span class="text-sm font-medium text-dark-100 leading-normal capitalize">
              {{ $t(item.label) }}
            </span>
          </div>
        </template>
      </div>
    </template>
  </CDropdown>
</template>
