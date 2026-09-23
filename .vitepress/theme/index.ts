// https://vitepress.dev/guide/custom-theme
import { h, nextTick, onMounted, watch } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import './style.css';
import {initializeImageInteractions} from '../../utils/custom-img';
import { pageTracker } from '../../utils/analytics/page-tracker';
import { ensureUid } from '../../utils/analytics/uid';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ router }) {
        router.onAfterRouteChange = () => initializeImageInteractions();
    },
    setup() {
        const { page, title, frontmatter } = useData();

        const trackCurrent = () => {
            if (typeof window === 'undefined') return;
            const data = page.value;
            // filePath 保留源文件路径（区别于被 rewrite 的 relativePath），
            // 因此可据此稳定判定文章：源文件位于 _posts/ 下。
            const isArticle =
                typeof data.filePath === 'string' && data.filePath.startsWith('_posts/');
            const fm = frontmatter.value ?? {};
            pageTracker.enter({
                path: window.location.pathname,
                title: title.value || data.title,
                isArticle,
                meta: {
                    filePath: data.filePath || undefined,
                    id: isArticle ? fm.id : undefined,
                    tags: isArticle ? fm.tags : undefined,
                    categories: isArticle ? fm.categories : undefined,
                },
            });
            if (isArticle) {
                // 等内容挂载后再观察文章正文的可见性来判定曝光。
                nextTick(() => pageTracker.bindExposure(document.querySelector('.vp-doc')));
            }
        };

        onMounted(() => {
            // 尽早解析持久化访客 id（缓存在 localStorage），后续事件携带 uid。
            void ensureUid();
            trackCurrent();
            watch(
                () => page.value.relativePath,
                () => nextTick(trackCurrent),
            );
        });
    },
} satisfies Theme;
