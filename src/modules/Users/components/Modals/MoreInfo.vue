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
  (event: "submit", value: any): void;
}>();







</script>

<template>
  <div>
    <CDialog
      :show="show"
      @close="() => $emit('close')"
      :title="$t('add_car_form.edit')"
      body-class="!w-[421px]"
    >
 
    </CDialog>
  </div>
</template>

<style scoped></style>
