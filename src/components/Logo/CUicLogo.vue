<template>
  <a
    href="telegrame: @nodirbekrajaboff"
    target="_blank"
    class="cursor-pointer inline-flex items-center transition-all duration-500"
  >
  <img src="/svg/logo_white.svg" alt="">
  </a>
</template>

<script setup lang="ts">
export interface Props {
  mainColor?: string;
  secondaryColor?: string;
}
withDefaults(defineProps<Props>(), {
  mainColor: "#000",
  secondaryColor: "#b0acab",
});
</script>
