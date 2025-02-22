<template>
  <div class="bg-[#F5F6F7]  w-full min-h-screen flex">
    <CSidebar />

    <!-- Asosiy kontentni o'z ichiga oluvchi div -->
    <div class="flex flex-col w-full h-screen overflow-hidden relative">
      <CHeader v-bind="{ activeRoute }" class="flex-shrink-0 w-full" />

      <!-- Faqatgina slot skroll bo'lishi uchun -->
      <div class="overflow-auto p-6">
        <slot />
      </div>

      <!-- Footer -->
      <div
        class="w-full p-2 bg-white flex justify-center items-center gap-2 text-dark text-sm leading-130 font-normal group"
      >
        made by:
        <a
        href="https://digitalaggregator.team/website"
        target="_blank"
         class="text-primary opacity-50 group-hover:opacity-100 transition-300">digitalaggregator.team</a>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CSidebar from "@/layout/Dashboard/components/CSidebar.vue";
import CHeader from "@/layout/Dashboard/components/CHeader.vue";

const activeRoute = "/";
</script>
