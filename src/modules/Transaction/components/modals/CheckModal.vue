<script lang="ts" setup>
import CDialog from "@/components/Common/Dialog/CDialog.vue";
import CButton from "@/components/Common/CButton.vue";
import CCard from "@/components/Card/CCard.vue";
import { useI18n } from "vue-i18n";
import { useForm } from "@/composables/useForm";
import {  required } from "@vuelidate/validators";
import FInput from "@/components/Form/Input/FInput.vue";

const { t } = useI18n();

const props = defineProps<{
  show: boolean;
}>();
const form = useForm(
  {
    name:"",
  },
  {
    name: {
      required,
    }
  }
);
const emit = defineEmits<{
  (event: "close"): void;
  (event: "send", value:string): void;
}>();
function send(){
  form.$v.value.$touch();
  if(!form.$v.value.$invalid){
    emit('send', form.values.name)
  }
}
</script>

<template>
  <CDialog
    :show="props.show"
    :title="t('cause_title')"
    body-class="max-w-[421px]!"
    header-style="border-none!"
    @close="emit('close')"
  >
    <CCard class="p-5 pt-1.5">
      <FInput
        v-model="form.values.name"
        :placeholder="$t('couse_placeholder')"
        :error="form.$v.value.name?.$error"
      />
      <CButton
        :text="t('close')"
        class="w-full mt-6"
        type="button"
        variant="primary"
        @click="send"
      />
    </CCard>
  </CDialog>
</template>

<style scoped></style>
