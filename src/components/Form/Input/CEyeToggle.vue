<template>
  <button
    type="button"
    class="eye-toggle inline-flex"
    :class="{ 'active-eye': !typePassword }"
    :style="{ '--fillColor': color, '--hoverColor': hoverColor }"
    @click="$emit('on-click')"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="circle"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9998 18C16.1253 18 19.059 15.4076 20.7771 13.2486C21.373 12.4998 21.373 11.5002 20.7771 10.7514C19.059 8.59239 16.1253 6 11.9998 6C7.87432 6 4.94062 8.59238 3.22256 10.7514C2.62666 11.5002 2.62666 12.4998 3.22256 13.2486C4.94062 15.4076 7.87432 18 11.9998 18ZM22.3421 14.494C23.518 13.0163 23.518 10.9837 22.3421 9.506C20.4738 7.15826 17.0264 4 11.9998 4C6.97329 4 3.52588 7.15826 1.6576 9.506C0.481647 10.9837 0.481647 13.0163 1.6576 14.494C3.52588 16.8417 6.97329 20 11.9998 20C17.0264 20 20.4738 16.8417 22.3421 14.494Z"
        :fill="color"
      />
      <path
        d="M20.7773 13.2486C19.0592 15.4076 16.1255 18 12 18C10.5111 18 9.17741 17.6623 8.00009 17.1292L6.27539 18.5C7.87702 19.3868 9.78522 20 12 20C17.0266 20 20.474 16.8417 22.3423 14.494C23.5182 13.0163 23.5182 10.9837 22.3423 9.506C21.5281 8.48289 20.4141 7.30585 19.0001 6.30334L17.9352 8C19.1003 8.84104 20.0482 9.83524 20.7773 10.7514C21.3732 11.5002 21.3732 12.4998 20.7773 13.2486Z"
        :fill="color"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 11.9716 10.0006 11.9434 10.0018 11.9153C10.1577 11.9701 10.3253 12 10.5 12C11.3284 12 12 11.3284 12 10.5C12 10.3253 11.9701 10.1577 11.9153 10.0018C11.9434 10.0006 11.9716 10 12 10C13.1046 10 14 10.8954 14 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
        :fill="color"
      />
      <path
        class="stick"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.9103 3.1433C22.3834 3.64601 22.3594 4.43711 21.8567 4.91025L4.85671 20.9103C4.35399 21.3834 3.5629 21.3594 3.08975 20.8567C2.61661 20.354 2.64058 19.5629 3.1433 19.0898L20.1433 3.08975C20.646 2.61661 21.4371 2.64058 21.9103 3.1433Z"
        :fill="color"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.9266 6.19441C13.3163 6.0692 12.6741 6 12 6C7.87456 6 4.94086 8.59238 3.2228 10.7514C2.6269 11.5002 2.6269 12.4998 3.2228 13.2486C3.64443 13.7784 4.13927 14.3344 4.70697 14.8717L3.24904 16.2439C2.63025 15.6502 2.09985 15.0494 1.65784 14.494C0.481891 13.0163 0.481891 10.9837 1.65784 9.506C3.52612 7.15826 6.97353 4 12 4C13.3221 4 14.5349 4.21847 15.6385 4.58322L13.9266 6.19441Z"
        :fill="color"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Props {
  typePassword: boolean;
  color: string;
  hoverColor: string;
}
withDefaults(defineProps<Props>(), {
  color: "#919299",
  hoverColor: "#009EF6",
});
</script>

<style scoped>
.eye-toggle svg path {
  fill: var(--fillColor);
  transition: all 0.2s ease-in;
}

.eye-toggle:hover svg path {
  fill: var(--hoverColor);
}

.eye-toggle svg path.stick {
  transform: scale(0);
  transform-origin: top right;
}

.active-eye svg path.stick {
  transform: scale(1);
}

.active-eye svg path.circle {
  opacity: 0;
}
</style>
