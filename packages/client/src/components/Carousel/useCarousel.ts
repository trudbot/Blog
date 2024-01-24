import {getCurrentInstance, ModelRef, onMounted, provide, watch} from "vue";
import {useOrderedChildren} from "@/hooks/useOrderedChildren.ts";
import {carouselContextKey, carouselItemContext} from "@/components/Carousel/constants.ts";

export const useCarousel = (
    initialActiveIndex: number | undefined,
    active: ModelRef<number>
) => {
    const instance = getCurrentInstance();
    const {
        children: items,
        addChild: addItem,
        removeChild: removeItem
    } = useOrderedChildren<carouselItemContext>(instance!, 'CarouselItem');

    active.value = initialActiveIndex === undefined ? 0 : initialActiveIndex;

    function setActive (index: number)  {
        index = Number(index);
        if (isNaN(index) || index < 0 || index >= items.value.length) {
            return;
        }
        const length = items.value.length;
        active.value = index;
        items.value.forEach((item, i) => {
            item.calcPosition(i, index, length);
        })
    }

    onMounted(() => {
        watch([() => items.value, active], () => {
            setActive(active.value);
        }, {immediate: true})
    })

    provide(carouselContextKey, {
        addItem,
        removeItem,
        setActive,
    })
}