<template>
  <div class="grid grid-cols-9">
    <div
      class="relative flex col-span-5 items-center flex-col justify-center py-12 overflow-y-scroll max-h-screen gap-4"
    >
      <slot />
    </div>
    <div
      class="col-span-4 w-full h-screen bg-primary bg-image relative flex flex-col items-center justify-between"
    >
      <SUicLogo class="absolute-x bottom-24" main-color="#fff" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SUicLogo from "@/components/Logo/CUicLogo.vue";
</script>

<style scoped>
.bg-image {
  background: linear-gradient(to top, #4facfe, #0c3b82);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
