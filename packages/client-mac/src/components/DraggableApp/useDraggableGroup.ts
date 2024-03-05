import { useOrderedChildren } from '@/hooks/useOrderedChildren.ts';
import { getCurrentInstance, provide, ref, Ref } from 'vue';
import { DraggableAppContext, DraggableGroupContextKey } from './constants.ts';
import { hideApp } from '@/components/DraggableApp/utils/hideApp.ts';
import { AppDockerInfo, DispatchFunc } from './types.ts';
import './style.scss';

/**
 * @param group 组件ref
 * @param msgCallBack 组件层对消息的处理
 * @returns {Object}
 * @property {AppDockerInfo[]} dockers 收集的app的docker信息
 */
export const useDraggableGroup = (
  group: Ref<HTMLElement | undefined>,
  msgCallBack: DispatchFunc
) => {
  const instance = getCurrentInstance();
  // docker项信息预期是符合dom序的， 且不能随items的变化而变化
  // 因此在app挂载和卸载的钩子中独立维护
  const dockers = ref<AppDockerInfo[]>([]);
  // 用于记录docker项的uid, 以便于在app卸载时删除对应的docker信息
  const dockersUidMap = ref<number[]>([]);

  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<DraggableAppContext>(
    instance!,
    'DraggableApp',
    () => {
      // docker项只取有序的app的docker信息
      dockers.value = items.value.map(app => {
        return {
          ...app.appInfo.dockerInfo,
          closed: app.getClosed()
        }
      });
      dockersUidMap.value = items.value.map(app => app.uid);

      const apps = items.value.sort((a, b) => {
        return a.getZIndex() - b.getZIndex();
      });
      apps.forEach((app, index) => {
        app.setZIndex(app.getZIndex(), index === apps.length - 1);
      });
    },
    (uid) => {
      dockers.value = dockers.value.filter((_item, idx) => {
        return dockersUidMap.value[idx] !== uid;
      });
      dockersUidMap.value = dockersUidMap.value.filter((item) => {
        return item !== uid;
      });
    }
  );

  /**
   * @description 设置app为活跃状态, 向app暴露, app调用此方法将自己设置为活跃状态
   * @param uid app的uid
   */
  function setActive (uid: number) {
    const apps = items.value;
    apps.sort((a, b) => {
      return a.getZIndex() - b.getZIndex();
    });
    let zIndex = 1;
    apps.forEach(app => {
      if (app.uid === uid) {
        app.setZIndex(apps.length, true);
      } else {
        app.setZIndex(zIndex++, false);
      }
    });
  }

  /**
   * @description 设置app为活跃状态, 向组件暴露
   */
  function setAppActive(appInfo: AppDockerInfo) {
    items.value.forEach(app => {
      if (app.appInfo.dockerInfo.name === appInfo.name) {
        app.launch();
        setActive(app.uid);
      }
    });
  }

  /**
   * @description 隐藏指定app
   * @param app app的dom元素
   */
  function hideAppFromGroup(app: HTMLElement) {
    group.value && app && hideApp(group.value, app);
  }

  /**
   * @description 供组件调用的恢复所有隐藏app的方法
   */
  function unHideAll() {
    items.value.forEach(app => {
      const appRef = app.appRef.value;
      appRef && (appRef.style.transform = 'none');
    });
  }

  /**
   * @description 将所有app设置为非活跃状态
   */
  function setAllAppInactive() {
    items.value.forEach(app => {
      app.setZIndex(app.getZIndex(), false);
    });
  }

  /**
   * @description 供组件调用的隐藏所有app的方法
   */
  function hideAll() {
    items.value.forEach(app => {
      hideAppFromGroup(app.appRef.value!);
    });
  }

  /**
   * @description 将app从最小化状态还原, 暴露给组件
   */
  function restoreApp(appInfo: AppDockerInfo) {
    items.value.forEach(app => {
      if (app.appInfo.dockerInfo.name === appInfo.name) {
        app.restore();
      }
    })
  }

  /**
   * 提供给app， 使得app可以向group发送消息， 内部为组件逻辑层对消息的处理
   * @param type
   * @param msg
   */
  const dispatch: DispatchFunc = (type, msg) => {
    if (type === 'close') {
      // 当活跃app被关闭时, 将次活跃app设为活跃app
      const appName = msg.dockerInfo.name;
      const apps = items.value.sort((a, b) => {
        return a.getZIndex() - b.getZIndex();
      });
      if (appName === apps[apps.length - 1].appInfo.dockerInfo.name) {
        setActive(apps[apps.length - 2].uid);
      }
    }
    msgCallBack(type, msg);
  };


  provide(DraggableGroupContextKey, {
    addItem,
    removeItem,
    setActive,
    dispatch
  });

  return {
    setAllAppInactive,
    hideAll,
    unHideAll,
    dockers,
    restoreApp,
    setAppActive
  };
}