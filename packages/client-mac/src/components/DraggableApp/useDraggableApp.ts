import { getCurrentInstance, inject, nextTick, onMounted, onUnmounted, Ref, ref } from 'vue';
import { DraggableGroupContextKey } from './constants.ts';
import { BaseAppInfo } from './types.ts';
import { generateSnapshot } from '@/components/DraggableApp/utils/snapshot.ts';

export const useDraggableApp = (
  // app的初始zIndex
  initialZIndex: number = 1,
  // app是否是关闭状态
  closed: boolean,
  // dom元素引用
  appRef: Ref<HTMLElement | undefined>,
  // zIndex变化时的回调
  setZIndexCallback: (zIndex: number) => void,
  // 主动将自己设置为激活状态
  launchAppCallback: () => void,
  // app的信息, 转发过程: app -> group -> docker
  appInfo: BaseAppInfo,
) => {
  const instance = getCurrentInstance();
  const context = inject(DraggableGroupContextKey);
  if (!context || !instance) {
    const shouldMinimize =  ref(false)
    const shouldClose =  ref(false)
    return {
      zIndex: ref(initialZIndex),
      setAppActive: () => {
        //do nothing
      },
      active: ref(true),
      dispatch: () => {},
      minimize: () => {
        shouldMinimize.value = true;
      },
      shouldMinimize,
      shouldClose
    }
  }
  const { addItem, removeItem, setActive, dispatch } = context;
  const zIndex = ref<number>(initialZIndex);
  const uid = instance.uid;
  const active = ref(true);
  const shouldMinimize = ref(false);
  const shouldClose = ref(closed);

  function getZIndex() {
    return zIndex.value;
  }

  function getClosed() {
    return shouldClose.value;
  }

  /**
   * @description app向group暴露的设置自己zIndex的方法
   * @param zIndexNew 新的zIndex
   * @param isActive app是否是激活状态(zIndex最大的app是激活状态, 其他app都是非激活状态)
   */
  function setZIndex(zIndexNew: number, isActive: boolean) {
    if (zIndexNew !== zIndex.value) {
      setZIndexCallback(zIndexNew);
    }
    zIndex.value = zIndexNew;
    active.value = isActive;
  }

  // 将app最小化
  function minimize() {
    generateSnapshot(appRef.value!).then(snapshot => {
      dispatch('minimize', {
        ...appInfo,
        snapshot
      });
      shouldMinimize.value = true;
    });
  }

  // 将app从最小化状态还原, 暴露给group
  function restore() {
    shouldMinimize.value = false;
  }

  function launch() {
    if (shouldClose.value) {
      // 从关闭状态打开时, 设为活跃app
      setActive(uid);
      shouldClose.value = false;
      nextTick().then(() => {
        launchAppCallback();
      });
    }
  }

  onMounted(() => {
    // 注意可能会变的值, 要么提供ref， 要么提供getter
    addItem({
      uid,
      setZIndex,
      getZIndex,
      getClosed,
      appInfo,
      appRef,
      restore,
      launch
    });

    launchAppCallback();
  })

  onUnmounted(() => {
    removeItem(instance.uid);
  })

  return {
    setSelfActive: () => {
      setActive(uid);
    },
    active,
    zIndex,
    // 向group上发事件的方法
    dispatch,
    shouldMinimize,
    minimize,
    shouldClose
  }
}