<template>
  <div
    :class="wrapperClass"
    class="relative w-full max-w-full overflow-auto overflow-x-scroll"
  >
    <Transition mode="out-in" name="dropdown">
      <div>
        <table v-if="!loading" class="w-full c-table">
          <thead>
            <tr>
              <th
                v-for="(h, index) in head"
                :key="index"
                :class="[
                  { 'w-[5%]': h.key === '_index' || h.key == 'action' },
                  thClass,
                ]"
                class="p-3 bg-gray! first:rounded-tl-md last:rounded-tr-md text-xs text-left first:pl-4 last:pr-4 last:text-left text-gray-100 font-medium"
              >
                <span
                  class="flex flex-nowrap shrink-0 whitespace-nowrap items-center gap-2 w-full capitalize"
                >
                  {{ $t(h.title) }}
                  <span
                    v-if="h?.sortable"
                    @click="emit('sort', h.sort_key!)"
                    class="hover:bg-gray-300 hover:text-white size-5 flex-center justify-center rounded-md transition-all cursor-pointer"
                    :class="{'bg-gray-300 text-white': orderValue?.includes(h.sort_key!)}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-up-down h-4 w-4"
                    >
                      <path d="m21 16-4 4-4-4"></path>
                      <path d="M17 20V4"></path>
                      <path d="m3 8 4-4 4 4"></path>
                      <path d="M7 4v16"></path>
                    </svg>
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody v-if="data?.length">
            <tr
              v-for="(d, index) in data"
              :key="index"
              :class="[
                bodyTrClass,
                { 'bg-white-500': index % 2 !== 0 },
                { 'even:bg-white-50': type === 'filled' },
              ]"
              class="border-b border-gray-400 hover:bg-gray/40 relative last:border-none shrink-0"
              @click="emit('onRowClick', d)"
            >
              <td
                v-for="(h, idx) in head"
                :key="idx"
                :class="[tdClass]"
                class="py-3 px-4 text-xs text-dark-100 whitespace-nowrap"
              >
                <div
                  v-if="statusColors"
                  class="w-1 h-10 absolute left-0 top-2 bg-red rounded-none rounded-tr-2xl rounded-br-2xl"
                />
                <div v-if="idx === 0" class="w-1 h-10 absolute left-0 top-2" />
                <slot :data="{ ...d, _index: getIndex(index) }" :name="h.key">
                  {{ h.key === "_index" ? getIndex(index) : d[h.key] }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
        <slot v-if="!data?.length && !loading" name="no-data">
          <div class="flex-center py-16">No Data</div>
        </slot>
      </div>
    </Transition>
    <div
      v-if="loading"
      class="w-full h-[500px] flex items-center justify-center"
    >
      <div class="flex flex-col items-center space-y-3 text-gray-100">
        <svg
          height="48"
          viewBox="0 0 24 24"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle cx="12" cy="3" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate0"
                attributeName="r"
                begin="0;svgSpinners12DotsScaleRotate2.end-0.5s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="16.5" cy="4.21" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate1"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate0.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="7.5" cy="4.21" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate2"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate4.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="19.79" cy="7.5" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate3"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate1.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="4.21" cy="7.5" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate4"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate6.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="21" cy="12" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate5"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate3.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="3" cy="12" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate6"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate8.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="19.79" cy="16.5" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate7"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate5.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="4.21" cy="16.5" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate8"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotatea.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="16.5" cy="19.79" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotate9"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate7.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="7.5" cy="19.79" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotatea"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotateb.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <circle cx="12" cy="21" fill="currentColor" r="1">
              <animate
                id="svgSpinners12DotsScaleRotateb"
                attributeName="r"
                begin="svgSpinners12DotsScaleRotate9.begin+0.1s"
                calcMode="spline"
                dur="0.6s"
                keySplines=".27,.42,.37,.99;.53,0,.61,.73"
                values="1;2;1"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              dur="6s"
              repeatCount="indefinite"
              type="rotate"
              values="360 12 12;0 12 12"
            />
          </g>
        </svg>
        <p>{{ $t("loading_data") }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TClassName } from "@/types/common";
import { ITableHead } from "@/types/components/table";

interface Props {
  type?: "filled" | "transparent";

  head: ITableHead[];
  orderValue?: string;

  thClass?: TClassName;
  bodyTrClass?: TClassName;
  tdClass?: TClassName;
  wrapperClass?: TClassName;

  data: Record<string, any>[];

  limit: number;
  currentPage: number;

  loading?: boolean;
  statusKey?: string;
  statusColors?: any;
}

const emit = defineEmits<{
  (e: "sort", value: string): void;
  (e: "onRowClick", value: string): void;
}>();
const props = withDefaults(defineProps<Props>(), {
  loading: true,
});

function getIndex(index: number) {
  return (props?.currentPage - 1) * props?.limit + index + 1;
}
</script>
<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #52618f 41%);
  background: linear-gradient(0deg, #52618f 50%, #52618f 0) center/4.5px 100%,
    linear-gradient(90deg, #52618f 50%, #52618f 0) center/100% 4.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1.5s infinite steps(12);
}

.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}

.spinner::after {
  opacity: 0.83;
  transform: rotate(60deg);
}

@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>
