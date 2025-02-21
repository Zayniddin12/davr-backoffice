<template>
  <div class="bg-[#F5F6F7] min-h-screen flex">
    <CSidebar />

    <div class="w-full h-full overflow-hidden">
      <CHeader v-bind="{ activeRoute }" />

      <div class="h-full w-full p-6 overfolw-x-scroll">
        <div class="w-full h-fit overflow-x-scroll">
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
