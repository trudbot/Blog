<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDockerItem } from '@/components/DraggableApp/components/Docker/useDockerItem.ts';
import {config} from './config.ts'

defineOptions({
  name: 'DockerItem'
})

const gapRef = ref<HTMLElement | undefined>();
const {ratio} = useDockerItem(gapRef);
const gapWidth = ref(config.gap);
const gapHeight = ref(config.itemSize);

watch(ratio, () => {
  gapWidth.value = config.gap * ratio.value;
  gapHeight.value = config.itemSize * ratio.value;
});

</script>

<template>
  <div
    class="gap"
    ref="gapRef"
    :style="{
      width: gapWidth + 'px',
      height: gapHeight + 'px'
    }"
  />
</template>

<style scoped lang="scss">
.gap {
  background: transparent;
}
</style>