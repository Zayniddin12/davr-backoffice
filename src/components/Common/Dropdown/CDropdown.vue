<template>
  <div class="relative" ref="target">
    <div :class="headClass" @click.stop="toggleShow" class="select-none">
      <slot name="head" v-bind="{ show }"></slot>
    </div>

    <Transition name="dropdown">
      <div
        v-if="show"
        class="absolute right-0 w-max min-w-full bg-white rounded-md overflow-hidden z-10 shadow-select cursor-pointer"
        :class="[
          bodyClass,
          above ? 'bottom-[calc(100%+12px)]' : 'top-[calc(100%+12px)]',
        ]"
        @click.stop="toggleShow"
      >
        <slot :data="{ show }" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  headClass?: TClassName;
  headActiveClass?: TClassName;
  bodyClass?: TClassName;
  above?: boolean; // Yangi props (pastda yoki tepada chiqishini belgilaydi)
}
defineProps<Props>();

interface Emits {
  (event: "toggle", value: boolean): void;
}
const emit = defineEmits<Emits>();

const show = ref(false);

function toggleShow() {
  show.value = !show.value;
  emit("toggle", show.value);
}

const target = ref();
onClickOutside(target, () => {
  show.value = false;
});
</script>
