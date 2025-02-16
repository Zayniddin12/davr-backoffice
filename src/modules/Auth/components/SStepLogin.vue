<template>
  <div class="w-[335px]">
    <p class="text-3xl leading-130 font-semibold text-dark text-center">
      {{ $t("enter_system") }}
    </p>
    <div class="mt-8">
      <SFormGroup class="mb-4" :label="$t('username')">
        <SInput
          :error="form.$v.value.username?.$error || isError"
          v-model="form.values.username"
          :prefix-class="'text-sm pr-1'"
        >
        </SInput>
      </SFormGroup>
      <SFormGroup class="mb-4" :label="$t('password')">
        <SInput
          :error="form.$v.value.password?.$error || isError"
          v-model="form.values.password"
          :prefix-class="'text-sm pr-1'"
        >
        </SInput>
      </SFormGroup>
      <SButton
        class="w-full"
        :text="$t('enter')"
        @click="submit"
        v-bind="{ loading }"
        :disabled="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SButton from "@/components/Common/CButton.vue";
import { ref, unref, watch } from "vue";
import SFormGroup from "@/components/Form/FGroup.vue";
import SInput from "@/components/Form/Input/FInput.vue";
import { useI18n } from "vue-i18n";
import { useCustomToast } from "@/composables/useCustomToast";
import { TForm } from "@/composables/useForm";
import { useAuthStore } from "@/modules/Auth/stores";

interface Props {
  form: TForm<any>;
}
const props = defineProps<Props>();
const emit = defineEmits(["submit", "on-block"]);
const store = useAuthStore();
const { form } = unref(props);
const isError = ref(false);

const { t } = useI18n();
const { showToast } = useCustomToast();

const loading = ref(false);

async function submit() {
  form.$v.value.$touch();
  
    if (!form.$v.value.$invalid) {
      
      isError.value = false;
      try {
        loading.value = true;
        await store.login(form.values);
        emit("submit");
      } catch (err) {
        if (err?.response?.status === 429) {
          emit("on-block");
          store.blockedTime = +err?.response?.headers["retry-after"];
        }
        isError.value = true;
        showToast(
          err?.response?.data?.[0]?.error?.message ||
            err?.response?.data?.errors[0]?.message ||
            t("check_login_password"),
          "error"
        );
      } finally {
        loading.value = false;
      }
    }
  
}

watch(
  () => form.values.phone,
  (val) => {
    if (val.length === 12) {
      form.$v.value.phone.$touch();
      isError.value = false;
    }
  }
);
</script>
