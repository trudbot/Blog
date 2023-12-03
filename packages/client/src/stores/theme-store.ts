import {defineStore} from "pinia";
import {useDark} from "@vueuse/core";

export const useThemeStore = defineStore('theme', () => {
    const dark = useDark();

    function isDark() {
        return dark.value;
    }

    function isLight() {
        return !dark.value;
    }

    function setDark() {
        dark.value = true;
    }

    function setLight() {
        dark.value = false;
    }

    function switchTheme() {
        console.log('切换主题')
        dark.value = !dark.value;
    }

    return {isDark, isLight, setLight, setDark, switchTheme};
})
