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
import { exchangeActions, usersHead } from "@/modules/Notification/data";
import { useTableFetch } from "@/composables/useTableFetch";
import { useRoute, useRouter } from "vue-router";
import { useCustomToast } from "@/composables/useCustomToast";
import ApiService from "@/services/ApiService";
import dayjs from "dayjs";
import {
  convertDateToString,
  convertStringToDate,
} from "@/utils/changeNumberFormat";
import { useHandleError } from "@/composables/useHandleError";

const { mounted } = useMounted();
const { t } = useI18n();
const { handleError } = useHandleError();
import { useAuthStore } from "@/modules/Auth/stores";

const store = useAuthStore();

const user = computed(() => store.user);
const routes = computed(() => [
  {
    name: t("accounts"),
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
} = useTableFetch("users", {}, true);

function deleteNotification(id: any) {
  isLoading.value = true;
  ApiService.delete(`users/${id}`)
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
const newUserHead = ref<{ title: string; key: string }[]>();
watch(
  user,
  () => {
    newUserHead.value = usersHead;
    if (user.value.role !== "super_admin") {
      newUserHead.value = usersHead.filter((item, index) => index !== 5);
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <Teleport v-if="mounted" to="#header-breadcrumbs">
    <SBreadcrumb v-bind="{ routes }" />
  </Teleport>
  <div class="p-6 bg-white rounded-xl w-full h-full">
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
          :title="$t('accounts')"
          :head="newUserHead"
          th-class="bg-gray! text-gray-100! last:text-right! max-w-[342px]! last:max-w-[100px]!"
        >
          <template #id="{ row }">
            <span class="font-semibold text-sm text-dark">{{
              row?._index
            }}</span>
          </template>
          <template #name="{ row: data }">
            <span
              class="text-dark font-semibold text-xs line-clamp-2 max-w-[382px]!"
              >{{ data?.fullName }}</span
            >
          </template>
          <template #username="{ row: data }">
            <p class="text-dark font-semibold text-xs">
              {{ data?.username }}
            </p>
          </template>
          <template #role="{ row: data }">
            <p class="text-dark font-semibold text-xs">
              {{ data?.role }}
            </p>
          </template>
          <template #date_create="{ row: data }">
            <p class="text-xs font-normal mb-1">
              {{ dayjs(data?.createdAt)?.format("DD.MM.YYYY") }}
            </p>
            <p class="text-xs font-normal text-gray-300">
              {{ dayjs(data?.createdAt)?.format("HH:mm") }}
            </p>
          </template>
          <template #afterSearch>
            <CButton
              v-if="user.role === 'super_admin'"
              :text="$t('add')"
              icon="icon-plus"
              class="flex items-center py-2 px-4 gap-2"
              size="md"
              @click="router.push({ name: 'PUserAdd' })"
            />
          </template>
          <template #no-data>
            <CNodata
              :title="$t('no_notifications_added')"
              :subtitle="$t('no_notifications_added_subtitle')"
              class="mt-8 px-6 pb-20 pt-0"
              :button-text="$t('add_notification')"
              image="/images/svg/no-data/no-notification.svg"
              button-custom-class="mt-0!"
              @submit="router.push({ name: 'PUserAdd' })"
            />
          </template>
          <!-- <template #action="{ row: data }" >
            <CActionsDropdown
              class="mr-4"
              :list="exchangeActions"
              :selected-item="data"
              @delete="deleteNotification(data?.id)"
            />
          </template> -->
        </CTableWrapper>
      </CCard>
    </div>
  </div>
</template>

<style scoped></style>
