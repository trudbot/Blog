import { onUnmounted, Ref, watch, watchEffect } from 'vue';
import { parsePXValue } from '../utils/domUtils.ts';

export enum ResizeBarPosition {
  Top,
  Right,
  Bottom,
  Left,
  TopRight,
  BottomRight,
  BottomLeft,
  TopLeft ,
}

export interface AppConfig {
  minWidth: number,
  minHeight: number,
  initialWidth: string,
  initialHeight: string
}

export type CallbackStyleInfo = {
  left?: string,
  top?: string,
  width?: string,
  height?: string
}

// 函数类型声明
// 函数作用: 根据当前位置修改元素样式
// 当达到了最小宽度或者最小高度时，返回true
type ResizeHandler = (
  target: HTMLElement,
  {
    offsetX,
    offsetY,
    left,
    top,
  }: {
    offsetX: number,
    offsetY: number,
    left: number,
    top: number,
    appConfig: AppConfig,
    styleCallBack: (style: CallbackStyleInfo) => void
  },
) => boolean;

// resize方向和对应的处理函数的映射关系
type HandlerMap = {
  [key in ResizeBarPosition]: ResizeHandler
}

// resize方向和对应的html元素的映射关系
export type ResizerDomMap =  {
  [key in ResizeBarPosition]?: Ref<HTMLElement | undefined>
}

// [没达到宽高极限, 达到宽高极限]两种状态对应的cursor图标
export const resizeCursor = {
  [ResizeBarPosition.Top]: ['ns-resize', 'n-resize'],
  [ResizeBarPosition.Right]: ['ew-resize', 'e-resize'],
  [ResizeBarPosition.Bottom]: ['ns-resize', 's-resize'],
  [ResizeBarPosition.Left]: ['ew-resize', 'w-resize'],
  [ResizeBarPosition.TopRight]: ['nesw-resize', 'ne-resize'],
  [ResizeBarPosition.BottomRight]: ['nwse-resize', 'se-resize'],
  [ResizeBarPosition.BottomLeft]: ['nesw-resize', 'sw-resize'],
  [ResizeBarPosition.TopLeft]: ['nwse-resize', 'nw-resize'],
}


const topResizer: ResizeHandler = (
  target,
  { offsetY, top , appConfig, styleCallBack}
) => {
  const newHeight = Math.max(appConfig.minHeight, target.offsetHeight - offsetY);
  const trueOffsetY = target.offsetHeight - newHeight;
  const newTop = Math.max(0, top + trueOffsetY);
  target.style.top = `${newTop}px`;
  target.style.height = `${newHeight}px`;
  styleCallBack({top: `${newTop}px`, height: `${newHeight}px`});
  return appConfig.minHeight === newHeight;
}

const rightResizer: ResizeHandler = (
  target,
  { offsetX, appConfig, styleCallBack }
) => {
  const newWidth = Math.max(appConfig.minWidth, target.offsetWidth + offsetX);
  target.style.width = `${newWidth}px`;
  styleCallBack({width: `${newWidth}px`});
  return appConfig.minWidth === newWidth;
}

const bottomResizer: ResizeHandler = (
  target,
  { offsetY, appConfig, styleCallBack}
) => {
  const newHeight = Math.max(appConfig.minHeight, target.offsetHeight + offsetY);
  target.style.height = `${newHeight}px`;
  styleCallBack({height: `${newHeight}px`});
  return appConfig.minHeight === newHeight;
}

const leftResizer: ResizeHandler = (
  target,
  { offsetX, left, appConfig, styleCallBack }
) => {
  const newWidth = Math.max(appConfig.minWidth, target.offsetWidth - offsetX);
  const trueOffsetX = target.offsetWidth - newWidth;
  const newLeft = Math.max(0, left + trueOffsetX);
  target.style.left = `${newLeft}px`;
  target.style.width = `${newWidth}px`;
  styleCallBack({left: `${newLeft}px`, width: `${newWidth}px`});
  return appConfig.minWidth === newWidth;
}

const topRightResizer: ResizeHandler = (
  target,
  info
) => {
  const limit1 = topResizer(target, info)
  const limit2 = rightResizer(target, info);
  return limit1 && limit2;
}

const bottomRightResizer: ResizeHandler = (
  target,
  info
) => {
  const limit1 = bottomResizer(target, info);
  const limit2 = rightResizer(target, info);
  return limit1 && limit2;
}

const bottomLeftResizer: ResizeHandler = (
  target,
  info
) => {
  const limit1 = bottomResizer(target, info);
  const limit2 = leftResizer(target, info);
  return limit1 && limit2;
}

const topLeftResizer: ResizeHandler = (
  target,
  info
) => {
  const limit1 = topResizer(target, info);
  const limit2 = leftResizer(target, info);
  return limit1 && limit2;
}

// 各方向的处理函数
const handlerMap: HandlerMap = {
  [ResizeBarPosition.Top]: topResizer,
  [ResizeBarPosition.Right]: rightResizer,
  [ResizeBarPosition.Bottom]: bottomResizer,
  [ResizeBarPosition.Left]: leftResizer,
  [ResizeBarPosition.TopRight]: topRightResizer,
  [ResizeBarPosition.BottomRight]: bottomRightResizer,
  [ResizeBarPosition.BottomLeft]: bottomLeftResizer,
  [ResizeBarPosition.TopLeft]: topLeftResizer,
}

// 设置body的cursor样式
// resize移动时, 鼠标会超出元素范围, 所以需要设置body的cursor样式
function setBodyCursor(cursor: string) {
  document.body.style.cursor = cursor;
}

export const useResize = (
  // 改动源
  sourceRef: Ref<HTMLElement | undefined>,
  // 作用元素
  targetRef: Ref<HTMLElement | undefined>,
  position: ResizeBarPosition,
  appConfig: AppConfig,
  callback: (style: CallbackStyleInfo) => void
) => {
  let source: HTMLElement;
  let target: HTMLElement;
  let dragStartX = 0;
  let dragStartY = 0;
  let resizeHandler: ResizeHandler = handlerMap[position];
  let cursors = resizeCursor[position];
  let defaultCursor = document.body.style.cursor;

  function mouseMoveHandler(e: MouseEvent) {
    if (e.buttons !== 1) {
      clearListener();
      return;
    }
    const computedStyle = window.getComputedStyle(target);
    const offsetX = e.clientX - dragStartX;
    const offsetY = e.clientY - dragStartY;
    const left = parsePXValue(computedStyle.left);
    const top = parsePXValue(computedStyle.top);
  
    const limited = resizeHandler(target, {
      offsetX,
      offsetY,
      left,
      top,
      appConfig,
      styleCallBack: callback
    });

    if (limited) {
      setBodyCursor(cursors[1]);
    } else {
      setBodyCursor(cursors[0]);
    }

    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }

  watchEffect(() => {
    if (sourceRef.value) {
      source = sourceRef.value;
      source.addEventListener('mousedown', mouseDown);
    }
    if (targetRef.value) {
      target = targetRef.value;
    }
  });

  onUnmounted(() => {
    clearListener();
  });

  function mouseDown(e: MouseEvent) {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    setBodyCursor(cursors[0]);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', clearListener);
  }

  function clearListener() {
    setBodyCursor(defaultCursor);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', clearListener);
  }
}

/**
 * @description 绑定resize相关的逻辑
 * @param resizerMap 各拖拽方向的dom元素
 * @param target 被resize的dom元素
 * @param active app是否为激活状态， 非激活状态的app hover不显示resize的cursor
 * @param appConfig app的相关配置信息
 * @param callback app被resize时的回调， 参数为app的相关style信息
 */
export const bindResizer = (
  resizerMap: ResizerDomMap,
  target: Ref<HTMLElement | undefined>,
  active: Ref<boolean>,
  appConfig: AppConfig,
  callback: (style: CallbackStyleInfo) => void
) => {
  for (let i = 0; i < 8; i ++) {
    const key = i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    const dom = resizerMap[key];
    if (dom) {
      useResize(dom, target, key, appConfig, callback);
      useResizerCursor(dom, active);
    }
  }
}

// hover时的鼠标样式及对应的css变量名
const cursorMap = [
  {
    name: '--left-cursor',
    value: 'ew-resize'
  },
  {
    name: '--right-cursor',
    value: 'ew-resize'
  },
  {
    name: '--top-cursor',
    value: 'ns-resize'
  },
  {
    name: '--bottom-cursor',
    value: 'ns-resize'
  }
]

// app不为焦点时, hover不显示特定cursor图标
export const useResizerCursor = (
  resizerRef: Ref<HTMLElement | undefined>,
  active: Ref<boolean>
) => {
  watch([active, resizerRef], (value) => {
    if (resizerRef.value) {
      const resizer = resizerRef.value;
      cursorMap.forEach(item => {
        resizer.style.setProperty(item.name, value ? item.value : 'auto');
      })
    }
  }, {immediate: true});
}