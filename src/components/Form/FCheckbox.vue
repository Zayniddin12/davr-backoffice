<template>
  <label
    class="group inline-flex items-center relative select-none min-h-6"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      v-bind="{ disabled }"
      type="checkbox"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="checked"
      :value="value"
      :name="name"
      @change="handleChange"
    />
    <span
      :class="[
        'duration-200 ease-in-out flex items-center justify-center bg-white h-5 w-5 rounded-md border-2 peer-checked:-rotate-90 peer-checked:after:opacity-100 peer-checked:after:rotate-[138deg] after:transition-all after:duration-200 after:absolute after:left-[7px] after:top-1 after:w-[5px] after:h-2.5 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[0deg] after:opacity-0 peer-checked:bg-green',
        'border-[#C8CFD6] peer-checked:border-transparent after:border-white peer-disabled:border-grey-100 peer-disabled:after:border-grey-100',
        {
          'border-red!': error,
          'group-hover:border-primary': !disabled,
          'border-green! relative': isAllCars,
        },
      ]"
      class="shrink-0"
    >
      <span
        v-if="isAllCars && !checked"
        class="absolute w-2.5 h-[1.5px] bg-green"
      ></span>
    </span>
    <span v-if="label" class="ml-2">
      <slot name="label">
        <span
          :class="['leading-130 text-dark text-xs font-medium', labelStyles]"
        >
          {{ label }}
        </span>
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number | boolean;
  label?: string;
  name?: string;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: boolean;
  labelStyles?: string;
  checked: boolean;
  isAllCars?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: "change", value: boolean): void;
}>();
const handleChange = (e: Event) => {
  emit("change", !props.checked);
};
</script>
