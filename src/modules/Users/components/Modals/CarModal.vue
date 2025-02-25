<script setup lang="ts">
import { useI18n } from "vue-i18n";
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import { useCustomToast } from "@/composables/useCustomToast";

const { showToast } = useCustomToast();

const { t } = useI18n();

const props = defineProps<{
  show: boolean;
  response?: {
    fullName?: string;
    password: string;
    role?: string;
    username?: string;
  };
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "submit"): void;
}>();

function copyTextToClipboard(text: string | undefined) {
  // Use the Clipboard API to write the text to the clipboard
  if (text) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        showToast(t("copied"), "success");
        emit("submit");
      })
      .catch(function (err) {
        console.error("Unable to copy text to clipboard:", err);
      });
  }
}
</script>

<template>
  <CDialog
    :show="show"
    :title="t('username_created')"
    body-class="!max-w-[421px] !h-max !h-[482px]"
    @close="$emit('close')"
  >
    <div class="p-4">
      <div class="text-base text-primary font-normal leading-130">
        {{ t("username") }}
      </div>
      <div
        @click="copyTextToClipboard(response?.username)"
        class="flex justify-between items-center gap-2 border border-gray rounded-md p-2 text-sm leading-130 font-medium text-primary w-full group cursor-pointer transition-300 mb-2"
      >
        <p class="w-full">{{ response?.username }}</p>
        <span
          class="icon-copy text-base font-semibod text-gray-300 transition-300 group-hover:text-primary"
        ></span>
      </div>
      <div class="text-base text-primary font-normal leading-130">
        {{ t("password") }}
      </div>
      <div
        @click="copyTextToClipboard(response?.password)"
        class="flex justify-between items-center gap-2 border border-gray rounded-md p-2 text-sm leading-130 font-medium text-primary w-full group cursor-pointer transition-300 mb-2"
      >
        <p class="w-full">{{ response?.password }}</p>
        <span
          class="icon-copy text-base font-semibod text-gray-300 transition-300 group-hover:text-primary"
        ></span>
      </div>
      <p class="text-red text-sm font-normal leading-130">
        <span class="icon-info-circle"></span> {{ t("warnong_deleate") }}
      </p>
    </div>
  </CDialog>
</template>

<style scoped></style>
