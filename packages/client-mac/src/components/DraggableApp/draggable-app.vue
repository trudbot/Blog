<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import { useDraggable } from './hooks/useDraggable.ts';
import { useDraggableApp } from './useDraggableApp.ts';
import { useMacOsBtnState } from '@/components/DraggableApp/hooks/useMacOsBtn.ts';
import { buttons } from './hooks/useMacOsBtn.ts';
import { useAppState } from '@/components/DraggableApp/hooks/useAppState.ts';
import {
  bindResizer,
  CallbackStyleInfo,
  ResizeBarPosition,
} from '@/components/DraggableApp/hooks/useResizer.ts';
import { parsePXValue } from '@/components/DraggableApp/utils/domUtils.ts';
import {config} from './components/Docker/config.ts'
import { DraggableGroupRef } from '@/components/DraggableApp/constants.ts';
import { AppDockerInfo } from './types';

/*
一个不知是好是坏的选择是， 组件中大量的视图逻辑是用dom操作实现的, 而不是使用vue的响应式状态绑定。
这是出于性能的担心， 例如drag、resize等操作， 变动是很频繁的。
但导致了视图的直接修改操作散落于各个hooks中， 使得组件的逻辑不够清晰。
*/

defineOptions({
  name: 'DraggableApp'
});

const props = withDefaults(defineProps<{
  topBarHeight?: number,
  height?: number,
  width?: number,
  appName: string,
  minHeight?: number,
  minWidth?: number,
  dockerInfo?: AppDockerInfo
}>(), {
  topBarHeight: 30,
  height: 400,
  width: 500,
  minWidth: 300,
  minHeight: 400,
  dockerInfo: () => {
    return {
      icon: '',
      system: false,
      name: ''
    }
  }
});

const emit = defineEmits<{
  close: [],
  minimize: [],
  maximize: []
}>();

const draggableBoxRef = ref<HTMLElement | undefined>();
const dragSourceRef = ref<HTMLElement | undefined>();
const groupRef = inject(DraggableGroupRef);

// 根据props和localStorage获得app的初始状态
// 返回一系列存储函数
const {
  initialState,
  setLeft,
  setTop,
  setWidth,
  setHeight,
  setZIndex,
  setClosed,
} = useAppState(
  props.appName,
  {
    width: `${props.width}px`,
    height: `${props.height}px`,
    position: {
      // app未保存位置时， 初始位置为屏幕中央
      left: `calc(50% - ${props.width / 2}px)`,
      top: `calc(50% - ${props.height / 2}px)`
    },
    zIndex: 1,
    closed: true
  }
)

function initAppSize() {
  const app = draggableBoxRef.value;
  if (app) {
    app.style.width = initialState.width
    app.style.height = initialState.height;
    app.style.left = initialState.position.left;
    app.style.top = initialState.position.top;
  }
}

// app拖拽逻辑

useDraggable(
  dragSourceRef,
  draggableBoxRef,
  (left) => {
    setLeft(left);
  },
  (top) => {
    setTop(top);
  },
  // 若移动到docker栏下时， 将app上移
  (_left, top) => {
    if (!draggableBoxRef.value || !groupRef?.value) return;
    const topValue = parsePXValue(top);
    const groupHeight = groupRef.value.clientHeight;
    if (topValue + 20 >= groupHeight - config.dockerHeight) {
      draggableBoxRef.value.style.top = `${topValue - 50}px`;
    }
  }
);

// 代理着所有app与group的交互
// 包括zIndex变化， 单击桌面隐藏所有app等
const {
  zIndex,
  setSelfActive,
  active,
  dispatch,
  minimize: sendMinimizeToGroup,
  shouldMinimize,
  shouldClose
} = useDraggableApp(
  initialState.zIndex,
  initialState.closed,
  draggableBoxRef,
  (zIndexNew) => {
    setZIndex(zIndexNew);
  },
  () => {
    initAppSize();
  },
  {
    dockerInfo: props.dockerInfo
  }
);

// 将app的关闭状态同步到localStorage
watch(shouldClose, (val) => {
  console.log('存储shouldClose', val, props.appName);
  setClosed(val);
}, {immediate: true});

// 左上角按钮图标切换逻辑
// 及按钮事件绑定
const btnSet = ref<HTMLElement | undefined>();
const {btnStyle} = useMacOsBtnState(btnSet, active, {
  close() {
    dispatch('close', {
      dockerInfo: props.dockerInfo,
    });
    shouldClose.value = true;
    emit('close');
  },
  minimize() {
    sendMinimizeToGroup();
    emit('minimize');
  },
  maximize() {
    dispatch('maximize', {
      dockerInfo: props.dockerInfo
    });
    emit('maximize');
  }
});

// app拉伸逻辑及cursor图标切换逻辑
const leftResizer = ref<HTMLElement | undefined>();
const rightResizer = ref<HTMLElement | undefined>();
const topResizer = ref<HTMLElement | undefined>();
const bottomResizer = ref<HTMLElement | undefined>();
const leftTopResizer = ref<HTMLElement | undefined>();
const leftBottomResizer = ref<HTMLElement | undefined>();
const rightTopResizer = ref<HTMLElement | undefined>();
const rightBottomResizer = ref<HTMLElement | undefined>();

bindResizer(
  {
    [ResizeBarPosition.Left]: leftResizer,
    [ResizeBarPosition.Right]: rightResizer,
    [ResizeBarPosition.Top]: topResizer,
    [ResizeBarPosition.Bottom]: bottomResizer,
    [ResizeBarPosition.TopLeft]: leftTopResizer,
    [ResizeBarPosition.BottomLeft]: leftBottomResizer,
    [ResizeBarPosition.TopRight]: rightTopResizer,
    [ResizeBarPosition.BottomRight]: rightBottomResizer
  },
  draggableBoxRef,
  active,
  {
    initialHeight: initialState.height,
    initialWidth: initialState.width,
    minWidth: props.minWidth,
    minHeight: props.minHeight,
  },
  (style: CallbackStyleInfo) => {
    if (style.width) {
      setWidth(style.width);
    }
    if (style.height) {
      setHeight(style.height);
    }
    if (style.left) {
      setLeft(style.left);
    }
    if (style.top) {
      setTop(style.top);
    }
  }
);

onMounted(() => {
  console.log(props.appName, shouldClose.value);
})

</script>

<template>
  <div
    class="draggable-box"
    ref="draggableBoxRef"
    v-if="!shouldClose"
    v-show="!shouldMinimize"
    @mousedown="setSelfActive"
    @click.stop
    :style="{
      zIndex,
    }"
  >
    <div
      class="top-bar"
      ref="dragSourceRef"
      :style="{ height: `${props.topBarHeight}px` }"
    >
      <!--左上角控制按钮-->
      <!--将每一种状态的按钮都预先渲染出来的原因是， 避免第一次hover加载图片带来的卡顿感-->
      <div class="btn-set" ref="btnSet">
        <span
          v-for="btn in buttons"
          :key="btn.key"
          class="btn-group"
          v-visibility="btnStyle === btn.key"
        >
          <span v-for="info in btn.info" :class="['btn', info.class]" :style="info.style"/>
        </span>
      </div>
      <span class="title" draggable="false">
        <slot name="title"></slot>
      </span>
    </div>
    <!--内容插槽-->
    <div class="content">
      <slot name="content" />
    </div>
    <!-- 上下左右拖拽改变窗口大小的定位元素 -->
    <div class="resize left" ref="leftResizer"/>
    <div class="resize right" ref="rightResizer"/>
    <div class="resize top" ref="topResizer"/>
    <div class="resize bottom" ref="bottomResizer"/>
    <div class="resize left-top corner" ref="leftTopResizer"/>
    <div class="resize left-bottom corner" ref="leftBottomResizer"/>
    <div class="resize right-top corner" ref="rightTopResizer"/>
    <div class="resize right-bottom corner" ref="rightBottomResizer"/>
  </div>
</template>

<style scoped lang="scss">
$radius: 10px;
.draggable-box {
  left: 50%;
  border-radius: $radius;
  position: absolute;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s cubic-bezier(0.52, 0.73, 0.01, 0.89);
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;

  .top-bar {
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
    background-color: #f0f0f0;
    width: 100%;
    display: flex;
    align-items: center;

    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;

    .title {
      flex: 1;
      height: 100%;
      user-select: none;
    }
  }

  .content {
    flex: 1;
    background-color: white;
    overflow: hidden;
    border-radius: 1%;
  }
}
</style>
<style src="./resize.scss"/>
<style src="./btn.scss" scoped/>