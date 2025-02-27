<script setup lang="ts">
import SBreadcrumb from "@/components/Common/CBreadcrumb.vue";
import { computed, ref } from "vue";
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
import { useHandleError } from "@/composables/useHandleError";
import { useAuthStore } from "@/modules/Auth/stores";
import CheckModal from "@/modules/Notification/components/Modals/CheckModal.vue";
import MoreInfo from "@/modules/Users/components/Modals/MoreInfo.vue";
import ModalFiles from "@/modules/Users/components/Modals/Files.vue";

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
const openMessageModal = ref(false);
const moreInfoModal = ref(false);
const showFiles = ref(false);
const files = ref<{
  extension: string
  href: string
  mimeType: string
  name:string 
  }[]>();
const statusData = ref("");
const idData = ref(NaN);
function sendStatus(status: string, id: number) {
  if (status == "canceled") {
    openMessageModal.value = true;
    statusData.value = status;
    idData.value = id;
  } else {
    postStatus(status, id);
  }
}
function postStatus(status: string, id: number, message?: string) {
  isLoading.value = true;
  ApiService.put(`client-information/${id}`, {
    status: status,
    message: message,
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

function getMessage(message: string) {
  postStatus(statusData.value, idData.value, message);
  openMessageModal.value = false;
}
const statusesdata = ref<
  {
    statusId: number;
    status: string;
    message?: string;
    createdAt: string;
    updateAt: null;
    user: {
      id: number;
      fullName: string;
      role: string;
    };
  }[]
>();
function geteDatas(
  data: {
    statusId: number;
    status: string;
    message?: string;
    createdAt: string;
    updateAt: null;
    user: {
      id: number;
      fullName: string;
      role: string;
    };
  }[]
) {
  moreInfoModal.value = true;
  statusesdata.value = data;
}
function showfiles(data: {
  extension: string
  href: string
  mimeType: string
  name:string 
  }[]) {
  showFiles.value = true;
  files.value = data;
}
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
          :items-per-page="+route.query?.limit || 10"
          :total="paginationData?.total"
          :limit="paginationData?.defaultLimit"
          :loading="loading"
          :title="$t('general_information')"
          :head="notificationHead(user?.role)"
          th-class="bg-gray! text-gray-100! last:text-right! max-w-[342px]! shrink-0!"
          @items-per-page="onChangeLimit"
          @page-change="onPageChange"
          @search="onSearch"
        >
          <template #id="{ row }">
            <span class="font-semibold text-sm text-dark">{{
              row?._index
            }}</span>
          </template>
          <template #name="{ row: data }">
            <span
              class="text-dark font-semibold text-xs line-clamp-2 max-w-[382px]!"
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
          <template #files="{ row: data }">
            <div
            v-if="data?.files?.length"
              @click="showfiles(data?.files)"
              class="text-xs text-dark cursor-pointer transition-300 hover:bg-gray font-normal mb-1 p-1 rounded-md border border-gray flex justify-center items-center"
            >
              {{ $t("files") }}
            </div>
            <div v-else>
              {{""}}
            </div>
          </template>

          <template #gps_situation="{ row: data }">
            <div
              :class="{
                'bg-indigo-500/10 text-indigo-500':
                  data?.statuses?.[0]?.status == 'in_progress',
                'bg-green-500/10 text-green-500':
                  data?.statuses?.[0]?.status == 'gps_installed',
                'bg-red-500/10 text-red-500':
                  data?.statuses?.[0]?.status == 'gps_not_installed',
                'bg-gray-500/10 text-gray-500': !data?.statuses?.[0]?.status,
              }"
              class="px-2 py-1 rounded-md text-center"
            >
              <p class="text-xs font-semibold capitalize">
                {{
                  data?.statuses?.[0]?.status
                    ? $t(data?.statuses?.[0]?.status)
                    : $t("waiting")
                }}
              </p>
            </div>
          </template>
          <template #verifier_situation="{ row: data }">
            <div
              :class="{
                'bg-indigo-500/10 text-indigo-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[1]?.status
                    : data?.statuses?.[0]?.status) == 'in_progress',
                'bg-green-500/10 text-green-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[1]?.status
                    : data?.statuses?.[0]?.status) == 'confirmed',
                'bg-red-500/10 text-red-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[1]?.status
                    : data?.statuses?.[0]?.status) == 'canceled',
                'bg-gray-500/10 text-gray-500': !([
                  'super_admin',
                  'boss',
                ].includes(user?.role)
                  ? data?.statuses?.[1]?.status
                  : data?.statuses?.[0]?.status),
              }"
              class="px-2 py-1 rounded-md text-center"
            >
              <p class="text-xs font-semibold capitalize">
                {{
                  (
                    ["super_admin", "boss"].includes(user?.role)
                      ? data?.statuses?.[1]?.status
                      : data?.statuses?.[0]?.status
                  )
                    ? $t(
                        ["super_admin", "boss"].includes(user?.role)
                          ? data?.statuses?.[1]?.status
                          : data?.statuses?.[0]?.status
                      )
                    : $t("waiting")
                }}
              </p>
            </div>
          </template>

          <template #lawyer_situation="{ row: data }">
            <div
              :class="{
                'bg-indigo-500/10 text-indigo-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[2]?.status
                    : data?.statuses?.[0]?.status) == 'in_progress',
                'bg-green-500/10 text-green-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[2]?.status
                    : data?.statuses?.[0]?.status) == 'confirmed',
                'bg-red-500/10 text-red-500':
                  (['super_admin', 'boss'].includes(user?.role)
                    ? data?.statuses?.[2]?.status
                    : data?.statuses?.[0]?.status) == 'canceled',
                'bg-gray-500/10 text-gray-500': !([
                  'super_admin',
                  'boss',
                ].includes(user?.role)
                  ? data?.statuses?.[2]?.status
                  : data?.statuses?.[0]?.status),
              }"
              class="px-2 py-1 rounded-md text-center"
            >
              <p class="text-xs font-semibold capitalize">
                {{
                  (
                    ["super_admin", "boss"].includes(user?.role)
                      ? data?.statuses?.[2]?.status
                      : data?.statuses?.[0]?.status
                  )
                    ? $t(
                        ["super_admin", "boss"].includes(user?.role)
                          ? data?.statuses?.[2]?.status
                          : data?.statuses?.[0]?.status
                      )
                    : $t("waiting")
                }}
              </p>
            </div>
          </template>
          <template #afterSearch>
            <CButton
              v-if="user.role === 'credit_manager'"
              :text="$t('add')"
              icon="icon-plus"
              class="flex items-center py-2 px-4 gap-2"
              size="md"
              @click="router.push({ name: 'PNotificationAdd' })"
            />
          </template>
          <template #no-data>
            <CNodata
              :title="$t('no_information_added')"
              :subtitle="$t('no_notifications_added_subtitle')"
              class="mt-8 px-6 pb-20 pt-0"
              :button-text="$t('add_notification')"
              image="/images/svg/no-data/no-notification.svg"
              :button-custom-class="
                user.role !== 'credit_manager' ? 'hidden!' : 'mt-0!'
              "
              @submit="router.push({ name: 'PNotificationAdd' })"
            />
          </template>
          <template #action="{ row: data }">
            <CActionsDropdown
            v-if="data?.statuses?.length"
              :isTop="tableData?.[tableData.length - 1]?.id == data?.id"
              :id="data?.id"
              :role="user?.role"
              :status="data?.statuses"
              class="mr-4"
              :list="exchangeActions(user?.role, data, data?.statuses)"
              :selected-item="data"
              @edit="sendStatus"
              @delete="deleteNotification(data?.id)"
              @more="geteDatas"
            />
          </template>
        </CTableWrapper>
      </CCard>
    </div>
    <CheckModal
      :show="openMessageModal"
      @close="openMessageModal = false"
      @send="getMessage"
    />
    <MoreInfo
      :show="moreInfoModal"
      :data="statusesdata"
      @close="moreInfoModal = false"
    />
    <ModalFiles :show="showFiles" :data="files" @close="showFiles = false" />
  </div>
</template>

<style scoped></style>
