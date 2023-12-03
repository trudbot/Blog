<script setup lang="ts">
import {ref, watch} from "vue";
import {useFullPage} from "./composables/fullpage.ts";

const props = defineProps<{
  duration?: string
}>();

const emit = defineEmits<{
  (e: 'toPage', to: number): void
}>();

const container = ref(null);
const {currIndex} = useFullPage(container, props.duration);

watch(currIndex, () => {
  emit('toPage', currIndex.value);
});


</script>

<template>
  <div class="full-page-container fill-up" ref="container">
    <slot>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.fill-up {
  width: 100%;
  height: 100%;
}

.full-page-container {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
