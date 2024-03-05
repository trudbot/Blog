import { InjectionKey, Ref } from 'vue';
import { BaseAppInfo, DispatchFunc } from './types';

export const DraggableGroupContextKey = Symbol(
  'DraggableGroupContextKey'
) as InjectionKey<{
    addItem: (item: DraggableAppContext) => void,
    removeItem: (uid: number) => void,
    setActive: (uid: number) => void,
    dispatch: DispatchFunc
}>

export const DraggableGroupName = Symbol(
  'DraggableGroupName'
) as InjectionKey<string>

export const DraggableGroupRef = Symbol(
  'DraggableGroupRef'
) as InjectionKey<Ref<HTMLElement | undefined>>

export interface DraggableAppContext {
    uid: number,
    setZIndex: (zIndex: number, isActive: boolean) => void,
    getZIndex: () => number,
    getClosed: () => boolean,
    appInfo: BaseAppInfo,
    appRef: Ref<HTMLElement | undefined>,
    restore: () => void,
    launch: () => void
}