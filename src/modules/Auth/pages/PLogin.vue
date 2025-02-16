<template>
  <div class="w-[340px]">
    <Transition :name="transitionName" mode="out-in">
      <div :key="step">
        <SStepLogin
          v-if="step === 1"
          @on-block="step = 2"
          v-bind="{ form }"
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
import { ref, watch } from "vue";
import SStepConfirm from "@/modules/Auth/components/SStepConfirm.vue";
import SStepBlocked from "@/modules/Auth/components/SStepBlocked.vue";
import { useAuthStore } from "@/modules/Auth/stores";
import apiService from "@/services/ApiService";

const store = useAuthStore();
const router = useRouter();

const step = ref(1);

const form = useForm(
  {
    username: "",
    password:""
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

//eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NDYsImp3dElkIjoiMjE0MTUxNTMzMzcyNTIxMjE3NzIiLCJleHAiOjE3Mzk3MjAwNTl9.fRKkN1XHZeal8GpW67OYrOfZDRX0lzaHxWvMobFgshE
async function finishLogin(token:any) {
  try {
    apiService.setHeader();
    await store.fetchUserData(token);
    await router.push({ name: "PDashboard" });
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
