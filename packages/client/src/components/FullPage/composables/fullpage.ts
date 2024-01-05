import {onMounted, ref, Ref} from "vue";
import {addSwipeListener, ScrollDirection} from "../../../utils/swipe";


export function useFullPage(container: Ref<HTMLElement | null>, duration: string | undefined) {
    const currIndex = ref(0);
    let animating = false;
    let sectionNum = 0;

    function gotoSection(target: number, ele: HTMLElement) {
        if (animating || target < 0 || target >= sectionNum) {
            return;
        }
        animating = true;
        ele.ontransitionend = () => {
            ele.ontransitionend = null;
            animating = false;
            currIndex.value = target;
        }
        for (let i = 0; i < sectionNum; i ++) {
            const child: HTMLElement= ele.children[i] as HTMLElement;
            child.style.transform = `translateY(-${100 * target}%)`;
        }
    }
    function bindEvents(ele: HTMLElement) {
        ele.addEventListener('wheel', (e) => {
            const updated = currIndex.value + (e.deltaY > 0 ? 1 : -1);
            gotoSection(updated, ele)
        }, {passive: true});

        addSwipeListener(ele, (direction, e) => {
            const updated = currIndex.value + (direction === ScrollDirection.Up ? 1 : -1);
            gotoSection(updated, ele);
            e.stopPropagation();
        }, {
            touchStartCallback: e => e.stopPropagation(),
            touchEndCallback: e => e.stopPropagation()
        })
    }

    onMounted(() => {
        if (container.value === null) {
            return;
        }
        sectionNum = container.value.children.length;
        if (duration) {
            for (let i = 0; i < sectionNum; i ++) {
                const child: HTMLElement= container.value.children[i] as HTMLElement;
                child.style.transition = `transform ${duration}`
            }
        }
        bindEvents(container.value);
    })

    return {currIndex}
}
