<template>
  <div class="w-full">
    <!-- Fayl Yuklash Tugmasi -->
    <label
      for="fileInput"
      class="flex items-center gap-2 cursor-pointer text-blue-600 font-medium py-2.5 px-3.5 rounded-lg border border-gray-800 shadow-sm w-fit transition duration-300 hover:border-blue-600"
    >
      <span class="icon-square text-xl text-gray-600"></span>
      <span class="text-dark leading-130 text-base font-semibold">{{
        $t("upload_file")
      }}</span>
    </label>
    <input
      id="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="onFileSelect"
    />

    <!-- Yuklangan Fayllar Ro'yxati -->
    <ul class="mt-4 space-y-2">
      <li
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center justify-between p-2 border rounded-lg"
      >
        <div class="flex items-center gap-2">
          <div
            class="bg-gray-200 rounded-md flex items-center justify-center w-7 h-7"
          >
            <span :class="file.icon" class="text-lg"></span>
          </div>
          <span class="truncate w-40">{{ file.file.name }}</span>
        </div>
        <div class="flex items-center gap-2">
          <div
            :class="file.error ? 'bg-red-400' : 'bg-green-300'"
            class="rounded-full w-6 h-6 flex items-center justify-center"
          >
            <span :class="file.statusIcon" class="text-sm text-white"></span>
          </div>
          <span
            class="icon-close cursor-pointer text-red-500"
            @click="removeFile(index)"
          ></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
const files = ref([...props.modelValue]);

const onFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files).map((file) => {
    const fileType = file.type;
    let icon = "icon-wallet";
    let statusIcon = "icon-checked";
    let error = false;

    if (fileType.startsWith("image")) {
      icon = "icon-add-picture";
    } else if (fileType.startsWith("video")) {
      icon = "icon-video";
    }

    // Faqat 5MB dan kichik fayllarni qabul qilamiz
    if (file.size > 5 * 1024 * 1024) {
      statusIcon = "icon-alert-triangle";
      error = true;
    }

    return { file, icon, statusIcon, error };
  });

  files.value = [...files.value, ...selectedFiles];
  emit("update:modelValue", files.value);
};

const removeFile = (index) => {
  files.value.splice(index, 1);
  emit("update:modelValue", files.value);
};
</script>
