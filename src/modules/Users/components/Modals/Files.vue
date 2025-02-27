<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import CDialog from "@/components/Common/Dialog/CDialog.vue";

interface Props {
  data?: {
  extension: string
  href: string
  mimeType: string
  name:string 
  }[];
  show: boolean;
}
defineProps<Props>();

defineEmits<{
  (event: "close"): void;
}>();

// Rasm kengaytmalari
const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".bmp",
  ".tiff",
  ".ico",
];
const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".webm"];
const pdfExtensions = [".pdf"];
const docExtensions = [".doc", ".docx"];
const excelExtensions = [".xls", ".xlsx"];
const archiveExtensions = [".zip", ".rar", ".7z", ".tar"];

// Fayl ikonalarini aniqlash
const getFileIcon = (filename: string) => {
  const ext = filename;

  if (!ext) return "icon-file"; // Nomalum fayl
  if (imageExtensions.includes(ext)) return "icon-add-picture";
  if (videoExtensions.includes(ext)) return "icon-add-picture";
  if (pdfExtensions.includes(ext)) return "icon-wallet";
  if (docExtensions.includes(ext)) return "icon-wallet";
  if (excelExtensions.includes(ext)) return "icon-copy";
  if (archiveExtensions.includes(ext)) return "icon-copy";
  return "icon-file"; // Boshqa fayllar
};
</script>

<template>
  <div>
    <CDialog
      :show="show"
      @close="$emit('close')"
      :title="$t('files')"
      body-class="w-[421px]!"
    >
      <div v-if="data?.length" class="flex flex-col gap-4 px-5 py-2">
        <a
          v-for="(item, key) in data"
          :key="key"
          :href="item?.href"
          class="border border-gray cursor-pointer transition-300 rounded-xl p-2 flex items-center gap-3 p-2"
        >
          <!-- Ikona -->
          <div
            class="bg-gray rounded-md flex items-center justify-center w-8 h-8"
          >
            <span :class="getFileIcon(item?.extension)" class="text-xl"></span>
          </div>

          <!-- Fayl nomi -->
          <span class="truncate w-40">{{ item?.name }}</span>
        </a>
      </div>
    </CDialog>
  </div>
</template>
