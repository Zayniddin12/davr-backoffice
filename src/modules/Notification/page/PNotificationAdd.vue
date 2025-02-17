<template>
  <Teleport v-if="mounted" to="#header-breadcrumbs">
    <CBreadcrumb v-bind="{ routes }" />
  </Teleport>
  <pre>{{ form.values.photo }}</pre>
  <div class="p-6 bg-white rounded-xl">
    <h3 class="text-xl font-bold text-dark border-b border-gray-400 pb-5">
      {{ $t("title_add_notification") }}
    </h3>
    <div class="w-full pt-6 bg-white rounded-xl grid grid-cols-2 gap-4">
          <FGroup :label="$t('notification_name')">
            <FInput
              :placeholder="$t('enter_name')"
              :maxlength="256"
              v-model="form.values.name"
              :error="form.$v.value.name?.$error"
            />
          </FGroup>
          <FGroup :label="$t('pinfl')">
            <FInput
              :placeholder="$t('add_pinfl')"
              v-model="form.values.pinfl"
               v-maska="'##############'"
              :error="form.$v.value.pinfl?.$error"
            />
          </FGroup>
          <FGroup :label="$t('car_number')">
            <FInput
              :placeholder="$t('enter_car_number')"
              v-model="form.values.carNumber"
              :error="form.$v.value.carNumber?.$error"
            />
          </FGroup>
          <FGroup :label="$t('vin_code')">
            <FInput
              :placeholder="$t('enter_vin_code')"
              v-model="form.values.vin"
              :error="form.$v.value.vin?.$error"
              v-maska="'XXXXXXXXXXXXXXXXX'"
            />
          </FGroup>
          <FGroup :label="$t('mark_of_car')">
            <FInput
              :placeholder="$t('enter_mark_car')"
              v-model="form.values.mark"
              :error="form.$v.value.mark?.$error"
            />
          </FGroup>
          <FGroup :label="$t('model_of_car')">
            <FInput
              :placeholder="$t('enter_model_car')"
              v-model="form.values.model"
              :error="form.$v.value.model?.$error"
            />
          </FGroup>
          <FGroup :label="$t('use_id')">
            <FInput
              :placeholder="$t('enter_user_id')"
              v-model="form.values.id"
              :error="form.$v.value.id?.$error"
            />
          </FGroup>
          <FGroup :label="$t('filial_of_bank')">
            <FInput
              :placeholder="$t('enter_filial_bank')"
              v-model="form.values.filial"
              :error="form.$v.value.filial?.$error"
            />
          </FGroup>
            <FGroup :label="$t('upload_file')" class="basis-3/12">
              <MultipleFileUploader v-model="form.values.photo" />
            </FGroup> 
    </div>
    <div
        class="space-x-4 flex items-center justify-end"
      >
        <CButton
          variant="info"
          :text="$t('cancel')"
          @click="router.push({ name: 'PNotification' })"
        />
        <CButton
          variant="primary"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          :text="$t('publish')"
          @click="createCategotyData"
        />
      </div>
  </div>
</template>
<script setup lang="ts">
import { useMounted } from "@/composables/useMounted";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import { maxLength, minLength, required } from "@vuelidate/validators";
import CButton from "@/components/Common/CButton.vue";
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import CTabLang from "@/components/Tab/CTabLang.vue";
import ApiService from "@/services/ApiService";
import { useCustomToast } from "@/composables/useCustomToast";
import MultipleFileUploader from "@/components/Form/Uploader/MultipleFileUploader.vue";
import CQuilEditor from "@/components/CQuilEditor.vue";
import FRadio from "@/components/Form/Radio/FRadio.vue";
import FDatePicker from "@/components/Form/Date/FDatePicker.vue";
import FTimePicker from "@/components/Form/Date/FTimePicker.vue";
import { convertToISOString } from "@/utils/changeNumberFormat";
import { INotification } from "@/modules/Notification/types";
import { useHandleError } from "@/composables/useHandleError";
const { showToast } = useCustomToast();

const { t } = useI18n();
const { mounted } = useMounted();
const { handleError } = useHandleError();
const router = useRouter();
const route = useRoute();
const routes = computed(() => [
  {
    name: t("notification"),
    route: "/notification",
  },
  {
    name: t("add"),
    route: "/notification/add",
  },
]);

const isDisabled = ref(false);

const buttonLoading = ref(false);

const form = useForm(
  {
    pinfl:"",
    name:"",
    carNumber:"",
    vin:"",   
    mark:"",
    model:"",
    id:"",
    filial:"",
    photo: "",
  },
  {
    pinfl: {
      required,
      minLength:minLength(14)
    },
    name: {
      required,
      maxLength: maxLength(156),
    },
    carNumber:{
      required
    },
    vin:{
      required
    },
    mark:{
      required
    },
    model:{
      required
    },
    id:{
      required
    },
    filial:{
      required
    }
  }
);



function createCategotyData() {
  console.log("salomlarnot");
  let data: INotification = form.values;
  data.scheduled_time = convertToISOString(
    data.datePicker,
    data.dateTimePicker
  );
  if (data.scheduled_time) data.is_scheduled = true;

  buttonLoading.value = true;
  ApiService.post("notifications/NotificationCreate/", data)
    .then(() => {
      buttonLoading.value = false;
      showToast(t("success_messages.successfully_added"), "success");
      router.push({ name: "PNotification" });
    })
    .catch((err) => {
      handleError(err);
    })
    .finally(() => (buttonLoading.value = false));
}
</script>

<style lang="scss">
.time-list-select li {
  display: flex;
  align-items: center;
  justify-content: center;
}
.time-list-select::-webkit-scrollbar {
  width: 0;
  display: none;
}

.time-list-select::-webkit-scrollbar-thumb {
  width: 0;
  background-color: transparent;
}
</style>
