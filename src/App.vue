<template>
  <div>
    <RouterView v-slot="{ Component }">
      <div :key="detectLayout">
        <component :is="detectLayout">
          <Component :is="Component" />
        </component>
      </div>
    </RouterView>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import LDefault from "@/layout/Dashboard/LDefault.vue";
import LError from "@/layout/Error/LError.vue";
import LAuth from "@/layout/Auth/LAuth.vue";
import { useClientSecret } from "@/composables/useClientSecretToken";
import LEmpty from "@/layout/Empty/LEmpty.vue";
import LStatic from "@/layout/Static/LStatic.vue";
// Setup
const clientSecret = useClientSecret();
const route = useRoute();
const layouts: { [key: string]: any } = {
  default: LDefault,
  error: LError,
  auth: LAuth,
  empty: LEmpty,
  static: LStatic,
};

const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});

clientSecret.init();

const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);


</script>
