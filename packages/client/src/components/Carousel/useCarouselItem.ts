import {getCurrentInstance, inject, onMounted, onUnmounted, ref} from "vue";
import {carouselContextKey} from "@/components/Carousel/constants.ts";

export const useCarouselItem = () => {
    const instance = getCurrentInstance();
    const carouselContext= inject(carouselContextKey);

    if (!instance || !carouselContext) {
        throw new Error("use-carousel-item, 实例不存在或未捕获到依赖");
    }

    const {
        addItem,
        removeItem,
        setActive
    } = carouselContext;

    const zIndex = ref(0);
    const offset = ref(0);
    const index = ref(0);

    function calcPosition(idx: number, activeIndex: number, length: number) {
        zIndex.value = length - Math.abs(idx - activeIndex);
        offset.value = idx - activeIndex;
        index.value = idx;
    }

    onMounted(() => {
        addItem({
            uid: instance.uid,
            calcPosition
        })
    })

    onUnmounted(() => {
        removeItem(instance.uid);
    })

    return {
        zIndex,
        offset,
        index,
        setActive
    }
}