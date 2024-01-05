import {onMounted, ref} from "vue";

export function useCodingSimulator(codeStr: string, interval: number) {
    const code = ref<string>(``);
    const disable = ref<boolean>(true);

    onMounted(() => {
        let idx: number = 0;
        const timer = setInterval(() => {
            if (idx === codeStr.length) {
                clearInterval(timer);
                disable.value = false;
                return;
            }
            code.value += codeStr[idx ++];
        }, interval);
    })

    return {code, disable};
}