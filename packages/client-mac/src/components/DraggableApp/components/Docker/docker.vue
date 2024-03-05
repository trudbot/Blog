<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDocker } from './useDocker.ts';
import DockerItem from './docker-item.vue';
import GapItem from './gap-item.vue';
import {config} from './config.ts'
import { DockerItemInfo } from './types';

const props = withDefaults(defineProps<{
  apps: DockerItemInfo[];
}>(), {
  apps: () => []
});

const emit = defineEmits<{
  appClick: [appInfo: DockerItemInfo]
  tempClick: [appInfo: DockerItemInfo]
}>();

const apps = ref<DockerItemInfo[]>([]);

// props.apps变化时重新更新apps
// 将导致临时界面丢失
watch(props, () => {
  apps.value = props.apps;
});

// 将所有item进行分类， 分为系统app、用户app、临时界面, 分区域渲染
const appCategories = computed(() => {
  const sysApps = apps.value.filter(app => app.system);
  const userApps = apps.value.filter(app => {
    return !(app.temp || app.system);
  });
  const tempAppSnapShot = apps.value.filter(app => app.temp);
  return [
    sysApps,
    userApps,
    tempAppSnapShot
  ]
});

const dockerRef = ref<HTMLElement | undefined>();
useDocker(dockerRef);

// item被点击时的emit处理
// 临时隐藏的界面项被点击时， 发送特殊的事件, 并将其从apps中移除
function appClick(appInfo: DockerItemInfo) {
  if (isTempAppClick(appInfo)) {
    tempAppClick(appInfo);
  } else {
    apps.value.forEach(app => {
      if (app.name === appInfo.name && !app.temp) {
        app.closed = false;
      }
    });
    emit('appClick', appInfo);
  }
}

function isTempAppClick(appInfo: DockerItemInfo) {
  if (appInfo.temp) {
    return true;
  }
  const tempApps = appCategories.value[2];
  if (tempApps?.length) {
    return tempApps.some(app => app.name === appInfo.name);
  }
  return false;
}

function tempAppClick(appInfo: DockerItemInfo) {
  apps.value = apps.value.filter(app => {
    return !(app.temp && app.name === appInfo.name);
  });
  emit('tempClick', appInfo);
}

/**
 * @description 暴露给group调用的方法， 用于group通知docker最小化某个app
 * @description 在docker中加一个临时界面项
 * @param appInfo app的信息
 * @param snapshot app被关闭时的快照
 */
function appMinimize(appInfo: DockerItemInfo, snapshot: string) {
  apps.value.push({
    ...appInfo,
    temp: true,
    snapshot
  });
}

/**
 * @description 暴露给group调用的方法， 用于group通知docker某个app处于关闭状态
 * @description
 * @param appInfo
 */
function appClosed(appInfo: DockerItemInfo) {
  apps.value.forEach(app => {
    if (app.name === appInfo.name && !app.temp) {
      app.closed = true;
    }
  });
}

// group和docker之间的通信并没有去使用provide/inject那一套(因为docker是由group直接渲染的）
// 所以docker向group发消息: 使用emit
// group向docker发消息: 使用expose直接暴露函数
defineExpose({
  appMinimize,
  appClosed
});
</script>

<template>
  <div class="docker" ref="dockerRef">
    <template v-for="(cate, cateIdx) in appCategories">
      <template v-for="(app, appIdx) in cate">
        <DockerItem 
          :appInfo="app"
          @click="appClick(app)"
        />
        <GapItem
          v-if="appIdx !== cate.length - 1"
        />
      </template>
      <template
        v-if="cateIdx !== appCategories.length - 1
             && cate.length
             && appCategories[cateIdx + 1].length"
      >
        <GapItem/>
        <div class="divider"/>
        <GapItem/>
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.docker {
  height: v-bind('config.dockerHeight + "px"');
  padding-bottom: v-bind('config.dockerHeight / 5 + "px"');
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: end;
  background: rgba(230, 230, 230, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 20px;

  .divider {
    width: 1px;
    height: 50px;
    background-color: #383c3e;
  }
}
</style>