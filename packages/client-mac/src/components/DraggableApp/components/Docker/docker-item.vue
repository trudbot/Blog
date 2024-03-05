<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDockerItem } from './useDockerItem.ts';
import {config} from './config.ts'
import { DockerItemInfo } from './types';

defineOptions({
  name: 'DockerItem'
});

const props = withDefaults(defineProps<{
  appInfo: DockerItemInfo;
}>(), {
  appInfo: () => ({
    icon: '',
    system: false,
    name: 'unknown',
    temp: false,
    closed: false
  })
});

const dockerItem = ref<HTMLElement | undefined>();
const {ratio} = useDockerItem(dockerItem);

const size = ref(config.itemSize);
watch(ratio, () => {
  size.value = config.itemSize * ratio.value;
});
</script>

<template>
  <div
    class="docker-item"
    ref="dockerItem"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
  >
    <div
      v-if="appInfo.temp"
      class="temp-app-snapshot"
    >
      <img
        :src="appInfo.icon"
        :alt="appInfo.name"
        style="width: 40%"
        class="app-icon temp-app-icon"
      />
      <div
        class="normal-app"
        v-html="appInfo.snapshot || ''"
      />
    </div>
    <div
      v-else-if="appInfo.icon.length"
      class="normal-app"
    >
      <img
        class="app-icon img-in-rect"
        :src="appInfo.icon"
        :alt="appInfo.name"
        style="width: 100%"
      />
      <span
        class="dot"
        v-show="!appInfo.closed"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.docker-item {
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  //正常的app容器
  .normal-app {
    .dot {
      $R: 4px;
      display: inline-block;
      background-color: black;
      position: absolute;
      width: $R;
      height: $R;
      top: calc(100% + 9px);
      left: calc(50% - $R / 2);
      border-radius: 50%;
      opacity: 0.6;
    }
  }

  .normal-app, .temp-app-snapshot {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .app-icon {
    z-index: 2;
    border-radius: 10px;
    overflow: hidden;
  }

  // 临时app的快照容器
  .temp-app-snapshot {
    background: transparent;

    .temp-app-icon {
      border-radius: 5px;
      position: absolute;
      right: 5%;
      bottom: 0;
    }
  }
}
</style>