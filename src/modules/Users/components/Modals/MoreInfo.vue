<script setup lang="ts">
import { defineProps, defineEmits, withDefaults} from "vue";
import CDialog from "@/components/Common/Dialog/CDialog.vue";

const props = withDefaults(
  defineProps<{
    data?:{
    statusId: number;
    status: string;
    message?:string;
    createdAt: string;
    updateAt: null;
    user: {
      id: number;
      fullName: string;
      role: string;
    };
  }[];
    show: boolean;
  }>(),
  {
    show: false,
  }
);
defineEmits<{
  (event: "close"): void;
}>();







</script>

<template>
  <div>
    <CDialog
      :show="show"
      :title="$t('general_information')"
      body-class="!w-[421px]"
      @close="() => $emit('close')"
    >
      <div class="flex flex-col gap-4 px-5 py-2">
        <div
          v-for="(item, key) in data"
          :key
          class="border border-gray-300 rounded-xl p-2 space-y-2"
        >
          <p class="text-dark text-lg font-medium leading-130">
            {{ $t(item?.user?.role) }}
          </p>
          <p class="text-sm leading-130 font-normal text-dark">
            <span class="font-medium">{{ $t('status') }}:</span> <span
              :class="{
                'text-indigo-500':
                  item?.status == 'in_progress',
                'text-green-500':
                  item?.status == 'gps_installed',
                'text-red-500':
                  item?.status == 'gps_not_installed' || item?.status == 'canceled',
                'text-gray-500': !item?.status,
              }"
            >{{ $t(item?.status) }}</span>
          </p>
          <p class="text-sm leading-130 font-normal text-dark">
            <span class="font-medium">{{ $t('responsible') }}:</span>
            {{ ' '+item?.user?.fullName }}
          </p>       
          <div
            v-if="item?.message"
            class="border border-gray-300 rounded-xl p-2 text-sm text-dark leading-130 font-normal"
          >
            {{ item?.message }}
          </div>
        </div>
      </div>
    </CDialog>
  </div>
</template>

<style scoped></style>
