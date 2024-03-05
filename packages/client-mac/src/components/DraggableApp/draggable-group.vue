<script setup lang="ts">
import { useDraggableGroup } from './useDraggableGroup.ts';
import { provide, ref } from 'vue';
import { DraggableGroupName, DraggableGroupRef } from './constants.ts';
import {barSize} from './utils/hideApp.ts';
import Docker from './components/Docker/docker.vue';
import { AppDockerInfo, MinimizeAppInfo } from './types.ts';

const props = withDefaults(defineProps<{
  groupName: string
}>(), {
  groupName: 'default'
});

const appGroup = ref<HTMLElement>();
const dockerRef = ref<InstanceType<typeof Docker> | null>(null);

provide(DraggableGroupName, props.groupName);
provide(DraggableGroupRef, appGroup);

const {
  setAllAppInactive,
  hideAll,
  unHideAll,
  dockers,
  restoreApp,
  setAppActive
} = useDraggableGroup(
  appGroup,
  (type, arg) => {
    if (type === 'close') {
      dockerRef.value?.appClosed(arg.dockerInfo);
    } else if (type === 'minimize') {
      dockerRef.value?.appMinimize(
        arg.dockerInfo,
        (arg as MinimizeAppInfo).snapshot
      );
    } else if (type === 'maximize') {
      
    }
  }
);

// 点击桌面, 隐藏所有窗口
const edgeBg = ref('transparent');
let hided = false;
function toggleClear() {
  if (!hided) {
    setAllAppInactive();
    edgeBg.value = `rgba(0, 0, 0, 0.5)`;
    hideAll();
  } else {
    edgeBg.value = 'transparent';
    unHideAll();
  }
  hided = !hided;
}

// app在docker中的图标被点击
// 此时未打开的app应打开, 已打开的app应置顶
function appClickInDocker(app: AppDockerInfo) {
  setAppActive(app);
}

function tempAppClick(app: AppDockerInfo) {
  restoreApp(app);
  setAppActive(app);
}
</script>

<template>
  <div class="app-group" @click="toggleClear" ref="appGroup">
    <slot></slot>
    <!--用resize相关类名仅是为了复用resizer的样式-->
    <div class="resize left" ref="leftResizer"/>
    <div class="resize right" ref="rightResizer"/>
    <div class="resize top" ref="topResizer"/>
    <div class="resize bottom" ref="bottomResizer"/>
    <div class="docker-container" @click.stop>
      <Docker 
        class="docker" 
        :apps="dockers"
        @appClick="appClickInDocker"
        @tempClick="tempAppClick"
        ref="dockerRef"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-group {
  width: 100%;
  height: 100%;
  position: relative;
  // 这里覆盖了部分resize.scss的全局样式
  .resize {
    --bar-size: v-bind(barSize);
    --out-size: 0;
    background: v-bind(edgeBg);
    background-blend-mode: color;
    transition: background-color 0.5s;

    &.top, &.bottom {
      width: calc(100% - var(--bar-size) * 2);
      left: var(--bar-size);
    }
  }
  .docker-container {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;

    .docker {
      z-index: 9999;
      margin-bottom: 5px;
    }
  }
}
</style>