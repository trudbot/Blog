import { inject } from 'vue';
import { DraggableGroupName } from '@/components/DraggableApp/constants.ts';
import {useLocalStorage} from './useLocalStorage.ts';
import {throttle} from 'lodash';

interface AppState {
  width: string,
  height: string,
  position: {
    left: string,
    top: string
  },
  zIndex: number,
  closed: boolean,
}

// 节流limit时间
const throttleTime = 100;

export const useAppState = (
  appName: string | undefined,
  initialState: AppState
) => {
  if (!appName) {
    return {
      initialState,
      setLeft: () => {},
      setTop: () => {},
      setWidth: () => {},
      setHeight: () => {},
      setZIndex: () => {},
      setClosed: () => {},
    }
  }
  const group = inject(DraggableGroupName) || 'window';
  const key = `app-state-${group}-${appName}`;
  const {data: state} = useLocalStorage<AppState>(
    key,
    initialState
  );
  //频繁发生的存储事件进行节流
  const setWidth = throttle((width: string) => {
    state.width = width;
  }, throttleTime);
  const setHeight = throttle((height: string) => {
    state.height = height;
  }, throttleTime);
  const setLeft = throttle((left: string) => {
    state.position.left = left;
  }, throttleTime);
  const setTop = throttle((top: string) => {
    state.position.top = top;
  }, throttleTime);

  const setZIndex = (zIndex: number) => {
    state.zIndex = zIndex;
  }

  const setClosed = (closed: boolean) => {
    state.closed = closed;
  }

  return {
    initialState: state,
    setWidth,
    setHeight,
    setLeft,
    setTop,
    setZIndex,
    setClosed
  }
}