<template>
  <div class="bg-[#F5F6F7] min-w-fit w-full min-h-screen flex">
    <CSidebar />

    <div class="w-full h-full">
      <CHeader v-bind="{ activeRoute }" />

      <div class="h-full w-full  p-6 relative overflow-x-scroll">
  <div class="w-full h-full overflow-x-scroll">
    <slot />
  </div>
</div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import CSidebar from "@/layout/Dashboard/components/CSidebar.vue";
import CHeader from "@/layout/Dashboard/components/CHeader.vue";

const activeRoute = "/";
</script>
