<template>
  <CCard class="shrink-0 p-6" v-if="dataVerifier?.tabs?.length">
    <div class="flex justify-between mb-5">
      <div>
        <h4 class="text-xl text-dark font-semibold mb-1">
          {{ $t("verifier_activity") }}
        </h4>
        <p class="text-gray-300 text-xs font-normal leading-130">
          {{ $t("verifier_activity_description") }}
        </p>
      </div>
      <Tab
        :list="tabList"
        v-model="tabValue"
        class="space-x-3 border-none"
        item-class="!pt-0 whitespace-nowrap"
      />
    </div>
    <div v-if="!loading">
      <Transition mode="out-in" name="fade">
        <div :key="tabValue" class="h-[280px]">
          <ApexChart
            :options="options"
            :series="formattedSeries"
            height="280px"
          />
        </div>
      </Transition>
    </div>
    <div v-else>
      <NoData
        :title="$t('empty_data')"
        class="mt-8"
        image="/svg/empty-state.svg"
      />
    </div>
  </CCard>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, reactive } from "vue";
import ApexChart from "vue3-apexcharts";
import CCard from "@/components/Card/CCard.vue";
import Tab from "@/components/Tab/CTab.vue";
import NoData from "@/components/Common/NoData/NoData.vue";
import { useI18n } from "vue-i18n";
import { useDashboardStore } from "@/modules/Dashboard/store";

const { t } = useI18n();
const dashboardStore = useDashboardStore();

const loading = ref(true);
const tabValue = ref("confirmed");
const dataVerifier=computed(()=>dashboardStore.verifier)

// Tab ro'yxatini hisoblash
const tabList = computed(() => {
  return dashboardStore.verifier.tabs.map((tab) => ({
    label: t(tab),
    value: tab,
  }));
});

// Chart ma'lumotlarini saqlash
const chartSeries = ref<{ createdAt: string; count: number }[]>([]);

// Chart opsiyalarini hisoblash
const options = reactive({
  chart: {
    type: "area",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    stacked: true,
    foreColor: "#090E14",
    toolbar: {
      show: false,
      tools: {
        selection: true,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    width: 591,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
    radialBar: {
      hollow: {
        background: "#fff",
      },
      dataLabels: {
        name: {},
        value: {},
        total: {},
      },
    },
    pie: {
      donut: {
        labels: {
          name: {},
          value: {},
          total: {},
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      fontWeight: 700,
    },
  },
  fill: {
    type: "gradient",
    colors: ["#0EDCFE"],
    gradient: {
      opacityFrom: 0.8,
      opacityTo: 0.2,
    },
  },
  grid: {
    borderColor: "#ECF3FA",
    strokeDashArray: 5,
    padding: {
      top: -10,
      right: 20,
      left: 15,
    },
  },
  legend: {
    show: false,
    horizontalAlign: "left",
    fontWeight: 500,
    offsetX: -35,
    offsetY: 2,
    markers: {
      width: 16,
      height: 16,
      radius: 3,
    },
    itemMargin: {
      horizontal: 16,
      vertical: 16,
    },
  },
  markers: {
    hover: {
      size: 0,
      sizeOffset: 6,
    },
  },
  stroke: {
    curve: "smooth",
    colors: ["#0EDCFE", "#0EDCFE"],
  },
  xaxis: {
    offsetY: -3,
    offsetX: 8,
    tooltip: {
      enabled: false,
    },

    labels: {
      show: true,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: ["#121C25"],
        fontSize: "12px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      format: undefined,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 5,
    title: {
      text: "",
      style: {
        fontWeight: 700,
      },
    },
  },
  tooltip: {
    enabled: false,
    style: {
      fontSize: "12px",
      fontFamily: "Roboto, sans-serif",
    },
    marker: {
      width: 8,
      height: 8,
      strokeWidth: 0,
      strokeColor: "#0EDCFE",
      fillColors: ["#0EDCFE"],
      radius: 12,
    },
  },
});

// tabValue o'zgarganda chartSeries ni yangilash
watch(tabValue, (newTab) => {
  updateChartSeries(tabValue.value);
});

const data = computed(() => {
  return dashboardStore.verifier.stats;
});

watch(
  data,
  () => {
    updateChartSeries(tabValue.value);
  },
  { deep: true }
);

// Komponent yuklanganda dastlabki chartSeries ni o'rnatish
onMounted(() => {
  if (tabList.value.length > 0) {
    tabValue.value = tabList.value[0].value;
    updateChartSeries(tabValue.value);
  }

  loading.value = false;
});

// chartSeries ni yangilash funksiyasi
function updateChartSeries(activeTab: string) {
  // Bu yerda activeTab ga asoslangan holda chartSeries ni yangilash lozim
  // Masalan:

  chartSeries.value = dashboardStore.verifier.stats?.[activeTab];
}
const formattedSeries = computed(() => {
  return [
    {
      name: "Faoliyat",
      data: chartSeries.value?.map((item) => ({
        x: item.createdAt,
        y: item.count,
      })),
    },
  ];
});
</script>
