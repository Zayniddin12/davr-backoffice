<template>
  <div class="w-[340px]">
    <Transition :name="transitionName" mode="out-in">
      <div :key="step">
        <SStepLogin
          v-if="step === 1"
          v-bind="{ form }"
          @on-block="step = 2"
          @submit="finishLogin"
        />
        <SStepBlocked v-if="step === 2" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import SStepLogin from "@/modules/Auth/components/SStepLogin.vue";
import { ref, watch, computed } from "vue";
import SStepBlocked from "@/modules/Auth/components/SStepBlocked.vue";
import { useAuthStore } from "@/modules/Auth/stores";
import apiService from "@/services/ApiService";

const store = useAuthStore();

const router = useRouter();

const step = ref(1);

const form = useForm(
  {
    username: "",
    password: "",
  },
  {
    username: {
      required,
    },
    password: {
      required,
    },
  }
);

async function finishLogin() {
  try {
    apiService.setHeader();
    await store.fetchUserData();
    const user = computed(() => store.user);
    if (user.value.role != "super_admin" && user.value.role != "boss") {
      await router.push({ name: "PNotification" });
    } else {
      await router.push({ name: "PDashboard" });
    }
  } catch (err) {
    console.log(err);
  }
}

const transitionName = ref("slide-right");

watch(
  () => step.value,
  (newValue, oldValue) => {
    if (newValue < oldValue) {
      transitionName.value = "slide-left";
    } else {
      transitionName.value = "slide-right";
    }
  }
);
</script>
