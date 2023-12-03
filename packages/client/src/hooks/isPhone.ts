import {onMounted, ref, watch} from "vue";
import {useWindowSize} from "@vueuse/core";
const maxPhoneWidth = 770;
export function usePhone() {
    const isPhone = ref(false);
    onMounted(() => {
        const {width} = useWindowSize();
        watch(width, () => {
            isPhone.value = width.value <= maxPhoneWidth;
        })
    })
    return {isPhone};
}
