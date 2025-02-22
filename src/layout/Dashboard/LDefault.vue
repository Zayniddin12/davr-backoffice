<template>
  <div class="bg-[#F5F6F7]  w-full min-h-screen flex">
    <CSidebar />

    <!-- Asosiy kontentni o'z ichiga oluvchi div -->
    <div class="flex flex-col w-full h-screen overflow-hidden">
      <CHeader v-bind="{ activeRoute }" class="flex-shrink-0 w-full" />

      <!-- Faqatgina slot skroll bo'lishi uchun -->
      <div class="flex-1 overflow-auto p-6">
        <slot />
      </div>

      <!-- Footer -->
      <a
        href="https://digitalaggregator.team/website"
        target="_blank"
        class="w-full p-2 bg-white opacity-50 hover:opacity-100 cursor-pointer transition-300 flex justify-center items-center gap-2 text-dark text-sm leading-130 font-normal"
      >
        made by:
        <div class="text-primary">digitalaggregator.team</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CSidebar from "@/layout/Dashboard/components/CSidebar.vue";
import CHeader from "@/layout/Dashboard/components/CHeader.vue";

const activeRoute = "/";
</script>
