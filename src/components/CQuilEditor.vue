<template>
  <div>
    <QuillEditor
      v-model:content="text"
      theme="snow"
      :toolbar="toolbar"
      content-type="html"
      :read-only="readOnly"
      :class="[
        'min-h-[180px] bg-gray rounded-b-lg',
        error ? 'border border-red! bg-red-100' : 'border-none',!
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
interface Props {
  content: unknown;
  error?: boolean;
  readOnly?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["getContent"]);

const text = ref();

watch(
  () => props.content,
  (val) => {
    text.value = val;
  },
  {
    immediate: true,
  }
);

watch(
  () => text.value,
  (val) => {
    emit("getContent", val);
  }
);

const toolbar = [
  "bold",
  "italic",
  "underline",
  { list: "bullet" },
  { list: "ordered" },
  "link",
  { color: [] },
  { background: [] },
  { align: [] },
  "clean",
];
</script>

<style>
.ql-toolbar.ql-snow {
  @apply bg-gray rounded-t-lg border-b border-solid border-white;
}
.ql-tooltip.ql-hidden {
  @apply hidden;
}
</style>
