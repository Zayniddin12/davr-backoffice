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
            <FGroup :label="$t('fullName')">
              <FInput
                :placeholder="$t('enter_full_name')"
                :maxlength="256"
                v-model="form.values.fullName"
                :error="form.$v.value.fullName?.$error"
              />
            </FGroup>
            <FGroup :label="$t('username')">
              <FInput
                :placeholder="$t('add_username')"
                v-model="form.values.userName"
                :error="form.$v.value.userName?.$error"
              />
            </FGroup>
            <FGroup :label="$t('role')">
                <FSelect
              :options="[{ full_name: t('all_users'), id: '' }, ...roleList]"
              v-model="form.values.role"
              :placeholder="$t('all_users')"
              value-key="id"
              label-key="role"
              selected-option-styles="h-10 w-full"
              :error="form.$v.value.role?.$error"
              is-checked
            />
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
            @click="createCategoryData"
          />
        </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useMounted } from "@/composables/useMounted";
  import { computed, reactive, ref } from "vue";
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
  import FSelect from "@/components/Form/Select/FSelect.vue";

  const { showToast } = useCustomToast();
  
  const roleList = ref([
    {
        role:"super_admin",
        id:"super_admin"
    },
    {
        role:"boss",
        id:"boss"
    },
    {
        role:"lawyer",
        id:"lawyer"
    },
    {
        role:"verifier",
        id:"verifier"
    },
    {
        role:"credit_manager",
        id:"credit_manager"
    },
    {
        role:"gps_engineer",
        id:"gps_engineer"
    },
  ]);
  const { t } = useI18n();
  const { mounted } = useMounted();
  const { handleError } = useHandleError();
  const router = useRouter();
  const route = useRoute();
  const routes = computed(() => [
    {
      name: t("accounts"),
      route: "/accounts",
    },
    {
      name: t("add"),
      route: "/accounts/add",
    },
  ]);
  
  const isDisabled = ref(false);
  
  const buttonLoading = ref(false);
  
  const form = useForm(
    {
      fullName:"",
      userName:"",
      role:"",
    },
    {
        fullName: {
        required,
      },
      userName: {
        required,
      },
      role:{
        required
      },
    
    }
  );
  
  
  function createCategoryData() {
    form.$v.value.$touch();
    buttonLoading.value = true;
  
    ApiService.post("/users",{
        "username":String(form.values.userName),
         "role":String(form.values.role),
         "fullName":String(form.values.fullName)
      },
      {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => {
        buttonLoading.value = false;
        showToast(t("success_messages.successfully_added"), "success");
        router.push({ name: "PAll" });
      })
      .catch((err) => {
        console.error("API error:", err);
        handleError(err);
      })
      .finally(() => {
        buttonLoading.value = false;
      });
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
  