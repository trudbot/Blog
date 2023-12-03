import {defineStore} from "pinia";
import {watch} from "vue";
import {useNavigatorLanguage} from "@vueuse/core";
import {useI18n} from "vue-i18n";

export const useLanguageStore = defineStore('language', () => {
    const { language } = useNavigatorLanguage();
    const {locale} = useI18n();
    watch(language, () => {
        if (language.value) {
            locale.value = language.value.startsWith('zh') ? 'zh' : 'en';
        }
    });

    function changeLanguage() {
        locale.value = (locale.value === 'zh' ? 'en' : 'zh');
    }

    function setZh() {
        locale.value = 'zh';
    }

    function setEn() {
        locale.value = 'en';
    }

    return {changeLanguage, setZh, setEn};
})
