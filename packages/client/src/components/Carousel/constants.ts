import {InjectionKey} from "vue";

export const carouselContextKey = Symbol('carouselContextKey') as InjectionKey<{
    addItem: (item: carouselItemContext) => void,
    removeItem: (uid: number) => void,
    setActive: (index: number) => void,
}>

export interface carouselItemContext {
    uid: number,
    calcPosition: (index: number, activeIndex: number, length: number) => void
}