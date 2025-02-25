<template>
  <Teleport
    v-if="mounted"
    to="#header-breadcrumbs"
  >
    <CBreadcrumb v-bind="{ routes }" />
  </Teleport>
  <div class="min-h-screen">
    <div class="p-6 bg-white rounded-xl">
      <h3 class="text-xl font-bold text-dark border-b border-gray-400 pb-5">
        {{ $t("title_add_information") }}
      </h3>
      <div class="w-full pt-6 bg-white rounded-xl grid grid-cols-2 gap-4">
        <FGroup :label="$t('notification_name')">
          <FInput
            v-model="form.values.name"
            :placeholder="$t('enter_name')"
            :maxlength="256"
            :error="form.$v.value.name?.$error"
          />
        </FGroup>
        <FGroup :label="$t('pinfl')">
          <FInput
            v-model="form.values.pinfl"
            v-maska="'##############'"
            :placeholder="$t('add_pinfl')"
            :error="form.$v.value.pinfl?.$error"
          />
        </FGroup>
        <FGroup :label="$t('car_number')">
          <FInput
            v-model="form.values.carNumber"
            :placeholder="$t('enter_car_number')"
            :error="form.$v.value.carNumber?.$error"
          />
        </FGroup>
        <FGroup :label="$t('vin_code')">
          <FInput
            v-model="form.values.vin"
            :placeholder="$t('enter_vin_code')"
            :error="form.$v.value.vin?.$error"
          />
        </FGroup>
        <FGroup :label="$t('mark_of_car')">
          <FInput
            v-model="form.values.mark"
            :placeholder="$t('enter_mark_car')"
            :error="form.$v.value.mark?.$error"
          />
        </FGroup>
        <FGroup :label="$t('model_of_car')">
          <FInput
            v-model="form.values.model"
            :placeholder="$t('enter_model_car')"
            :error="form.$v.value.model?.$error"
          />
        </FGroup>
        <FGroup :label="$t('use_id')">
          <FInput
            v-model="form.values.id"
            :placeholder="$t('enter_user_id')"
            :error="form.$v.value.id?.$error"
          />
        </FGroup>
        <FGroup :label="$t('filial_of_bank')">
          <FInput
            v-model="form.values.filial"
            :placeholder="$t('enter_filial_bank')"
            :error="form.$v.value.filial?.$error"
          />
        </FGroup>
        <FGroup
          :label="$t('upload_file')"
          class="max-[1000px]:col-span-2"
        >
          <MultipleFileUploader v-model="form.values.photo" />
        </FGroup>
      </div>
      <div class="space-x-4 flex items-center justify-end mt-4">
        <CButton
          variant="info"
          :text="$t('cancel')"
          @click="router.push({ name: 'PNotification' })"
        />
        <CButton
          variant="primary"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          :text="$t('add')"
          @click="createCategoryData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { vMaska } from "maska/vue";
import { useMounted } from "@/composables/useMounted";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import CBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import { maxLength, minLength, required } from "@vuelidate/validators";
import CButton from "@/components/Common/CButton.vue";
import FGroup from "@/components/Form/FGroup.vue";
import FInput from "@/components/Form/Input/FInput.vue";
import ApiService from "@/services/ApiService";
import { useCustomToast } from "@/composables/useCustomToast";
import MultipleFileUploader from "@/components/Form/Uploader/MultipleFileUploader.vue";
import { useHandleError } from "@/composables/useHandleError";
const { showToast } = useCustomToast();

const { t } = useI18n();
const { mounted } = useMounted();
const { handleError } = useHandleError();
const router = useRouter();
const routes = computed(() => [
  {
    name: t("informations"),
    route: "/informations",
  },
  {
    name: t("add"),
    route: "/informations/add",
  },
]);

const isDisabled = ref(false);

const buttonLoading = ref(false);

const form = useForm(
  {
    pinfl: NaN,
    name: "",
    carNumber: "",
    vin: "",
    mark: "",
    model: "",
    id: "",
    filial: "",
    photo: [] as any,
  },
  {
    pinfl: {
      required,
      minLength: minLength(14),
    },
    name: {
      required,
      maxLength: maxLength(156),
    },
    carNumber: {
      required,
    },
    vin: {
      required,
    },
    mark: {
      required,
    },
    model: {
      required,
    },
    id: {
      required,
    },
    filial: {
      required,
    },
  }
);

function createCategoryData() {
  form.$v.value.$touch();

  if (!form.values) {
    console.error("form.values is undefined or null");
    return;
  }

  const formData = new FormData();

  // JSON objectlarni string ko‘rinishida qo‘shish
  formData.append(
    "user",
    JSON.stringify({
      fullName: form.values.name ?? "",
      pinfl: form.values.pinfl ?? 0,
      clientId: form.values.id ?? "",
    })
  );

  formData.append(
    "bank",
    JSON.stringify({
      branch: form.values.filial ?? "",
    })
  );

  formData.append(
    "car",
    JSON.stringify({
      number: form.values.carNumber ?? "",
      vinCode: form.values.vin ?? "",
      brand: form.values.mark ?? "",
      model: form.values.model ?? "",
    })
  );
  // Fayllarni qo‘shish (agar `photo` mavjud bo‘lsa)
  if (Array.isArray(form.values.photo)) {
    form.values.photo.forEach((file, index) => {
      console.log(form.values.photo);
      if (file instanceof File) {
        formData.append("files", file);
      } else if (file?.file instanceof File) {
        // Agar fayl obyekt ichida bo‘lsa
        formData.append("files", file.file);
      }
    });
  }

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  if (!form.$v.value.$invalid) {
    buttonLoading.value = true;
    ApiService.post("client-information", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        buttonLoading.value = false;
        showToast(t("success_messages.successfully_added"), "success");
        router.push({ name: "PNotification" });
      })
      .catch((err) => {
        console.error("API error:", err);
        showToast(t("failed_with_some_errors"), "error");
      })
      .finally(() => {
        buttonLoading.value = false;
      });
  }
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
