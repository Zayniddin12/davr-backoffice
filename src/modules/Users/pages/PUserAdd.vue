<template>
    <Teleport v-if="mounted" to="#header-breadcrumbs">
      <CBreadcrumb v-bind="{ routes }" />
    </Teleport>
 <div class="min-h-screen">
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
              :options="roleList"
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
            @click="router.push({ name: 'PUsers' })"
          />
          <CButton
            variant="primary"
            :loading="buttonLoading"
            :disabled="buttonLoading"
            :text="$t('add')"
            @click="createCategoryData"
          />
        </div>
        <CarModal
      :show="carModal"
      @close="closeModal"
      :response="response"
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
  import { required } from "@vuelidate/validators";
  import CarModal from "@/modules/Users/components/Modals/CarModal.vue";
  import CButton from "@/components/Common/CButton.vue";
  import FGroup from "@/components/Form/FGroup.vue";
  import FInput from "@/components/Form/Input/FInput.vue";
  import ApiService from "@/services/ApiService";
  import { useCustomToast } from "@/composables/useCustomToast";
  import { useHandleError } from "@/composables/useHandleError";
  import FSelect from "@/components/Form/Select/FSelect.vue";

  const { showToast } = useCustomToast();

  const carModal = ref(false);
  const response=ref<{  
  fullName: string,
  password: string,
  role: string
  username: string
  }>()
  const roleList = ref([
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
      .then((res) => {
        buttonLoading.value = false;
        showToast(t("success_messages.successfully_added"), "success");
        response.value=res?.data
        carModal.value=true
        
      })
      .catch((err) => {
        showToast(t("error"), "error");
        handleError(err);
      })
      .finally(() => {
        buttonLoading.value = false;
      });
  }
  function closeModal() {
    carModal.value = false
    router.push({ name: "PUsers" });
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
  