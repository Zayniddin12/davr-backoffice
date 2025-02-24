<script setup lang="ts">
import SBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { computed, ref, watch } from "vue";
import { useMounted } from "@/composables/useMounted";
import { useI18n } from "vue-i18n";
import CNodata from "@/components/Common/NoData/NoData.vue";
import CButton from "@/components/Common/CButton.vue";
import CCard from "@/components/Card/CCard.vue";
import CTableWrapper from "@/components/Common/Table/CTableWrapper.vue";
import CActionsDropdown from "@/components/Common/Dropdown/CActionsDropdown.vue";
import { exchangeActions, notificationHead } from "@/modules/Notification/data";
import { useTableFetch } from "@/composables/useTableFetch";
import { useRoute, useRouter } from "vue-router";
import { useCustomToast } from "@/composables/useCustomToast";
import ApiService from "@/services/ApiService";
import { IActionType } from "@/components/Common/Dropdown/CActionsDropdown.types";
import {
  convertStringToDate,
} from "@/utils/changeNumberFormat";
import { useHandleError } from "@/composables/useHandleError";
import { useAuthStore } from "@/modules/Auth/stores";


const store = useAuthStore();

const user = computed(() => store.user);

const { mounted } = useMounted();
const { t } = useI18n();
const { handleError } = useHandleError();
const routes = computed(() => [
  {
    name: t("notification"),
    route: "/",
  },
]);
const route = useRoute();
const { showToast } = useCustomToast();
const router = useRouter();
const isLoading = ref(false);


const {
  tableData,
  paginationData,
  onSearch,
  onPageChange,
  onChangeLimit,
  loading,
  fetchTableData,
  filterTableData,
} = useTableFetch("client-information", {}, true);

function deleteNotification(id: any) {
  isLoading.value = true;
  ApiService.delete(`client-information/${id}`)
    .then(() => {
      showToast(t("success_messages.successfully_deleted"), "success");
      fetchTableData();
    })
    .catch((err) => {
      handleError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
function postStatus(status:string, id:number) {  
  isLoading.value = true;
  ApiService.put(`client-information/${id}`,{
  "status":status 
  })
    .then(() => {
      showToast(t("success_messages.successfully_send"), "success");
      fetchTableData();
    })
    .catch((err) => {
      handleError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
const newDataHead=ref<{
    title: string,
    key: string,
  }>()
  const newDropdownList=ref<IActionType[]>()

</script>

<template>
  <Teleport v-if="mounted" to="#header-breadcrumbs">
    <SBreadcrumb v-bind="{ routes }" />
  </Teleport>
  <div class="p-6 bg-white rounded-xl w-full">
    <div>
      <CCard>
        <CTableWrapper
          :data="tableData"
          :current-page="paginationData?.currentPage"
          @itemsPerPage="onChangeLimit"
          :items-per-page="+route.query?.limit || 10"
          :total="paginationData?.total"
          @pageChange="onPageChange"
          @search="onSearch"
          :limit="paginationData?.defaultLimit"
          :loading="loading"
          :title="$t('general_information')"
          :head="notificationHead(user?.role)"
          th-class="!bg-gray !text-gray-100 last:!text-right !max-w-[342px] !shrink-0"
        >
          <template #id="{ row }">
            <span class="font-semibold text-sm text-dark"
              >{{ row?._index }}</span
            >
          </template>
          <template #name="{ row: data }">
            <span
              class="text-dark font-semibold text-xs line-clamp-2 !max-w-[382px]"
              >{{ data?.user?.fullName }}</span
            >
          </template>
          <template #pinfl="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.user?.pinfl }}
            </p>
          </template>
          <template #number_of_car="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.car?.number }}
            </p>
          </template>
          <template #vin_code="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.car?.vinCode }}
            </p>
          </template>
          <template #mark_of_car="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.car?.brand }}
            </p>
          </template>
          <template #user_id="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.user?.clientId }}
            </p>
          </template>
          <template #model_of_car="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.car?.model }}
            </p>
          </template>
          <template #filial_of_bank="{ row: data }">
            <p class="text-xs text-dark font-normal mb-1">
              {{ data?.bank?.branch }}
            </p>
          </template>
          <template #gps_situation="{ row: data }" >
            <div :class="{'bg-primary':data?.statuses?.[0]?.status=='in_progress', 'bg-green':data?.statuses?.[0]?.status=='gps_installed', 'bg-gray':!data?.statuses?.[0]?.status}" class="px-2 py-1 rounded-md">
              <p class="text-xs text-dark font-normal">
              {{ data?.statuses?.[0]?.status ? $t(data?.statuses?.[0]?.status) : $t('waiting') }} 
            </p>
            </div>
          </template>
          <template #verifier_situation="{ row: data }" >
            <div :class="{'bg-primary':data?.statuses?.[0]?.status=='initiated'}" class="px-2 py-1 rounded-md">
              <p class="text-xs text-dark font-normal">
              {{ data?.statuses?.[0]?.status ? $t(data?.statuses?.[0]?.status) : $t('waiting') }}
            </p>
            </div>
          </template>
          <template #lawyer_situation="{ row: data }" >
            <div :class="{'bg-primary':data?.statuses?.[0]?.status=='initiated'}" class="px-2 py-1 rounded-md">
              <p class="text-xs text-dark font-normal">
              {{ data?.statuses?.[0]?.status ? $t(data?.statuses?.[0]?.status) : $t('waiting') }}
            </p>
            </div>
          </template>
          <template #afterSearch >
            <CButton
            v-if="user.role==='credit_manager'"
              :text="$t('add')"
              icon="icon-plus"
              class="flex items-center py-2 px-4 gap-2"
              size="md"
              @click="router.push({ name: 'PNotificationAdd' })"
            />
          </template>
          <template #no-data>
            <CNodata
              :title="$t('no_notifications_added')"
              :subtitle="$t('no_notifications_added_subtitle')"
              class="mt-8 px-6 pb-20 pt-0"
              :button-text="$t('add_notification')"
              image="/images/svg/no-data/no-notification.svg"
              :button-custom-class="user.role!=='credit_manager'?'!hidden':'!mt-0'"
              @submit="router.push({ name: 'PNotificationAdd' })"
            />
          </template>
          <template #action="{ row: data }" >
            <CActionsDropdown
              :role="user?.role"
              :status="data?.statuses"
              :id="data?.id"
              class="mr-4"
              :list="exchangeActions(user?.role, data, data?.statuses)"
              :selected-item="data"
              @edit="postStatus"
              @delete="deleteNotification(data?.id)"
            />
          </template>
        </CTableWrapper>
      </CCard>
    </div>
  </div>
</template>

<style scoped></style>
