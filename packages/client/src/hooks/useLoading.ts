import { ref } from "vue";
import { setTimeout, clearTimeout } from "worker-timers";

const delay = 100;
const loadingMinTime = 500;

// 小于100ms的loading不显示
// loading至少显示500ms

export function useLoading(initState: boolean = false) {
    const loading = ref<boolean>(initState);
    let loadingStart: Date;
    let timeout: number;

    function startLoading() {
        if (loading.value) return;
        loadingStart = new Date();
        timeout = setTimeout(() => {
            loading.value = true;
        }, delay);
    }

    function stopLoading() {
        clearTimeout(timeout);
        if (!loading.value) return;
        if (loading.value) {
            setTimeout(() => {
                loading.value = false;
            }, Math.max(0, loadingMinTime - (Date.now() - loadingStart.getTime())))
        }
    }

    return {
        loading,
        startLoading,
        stopLoading
    }
}