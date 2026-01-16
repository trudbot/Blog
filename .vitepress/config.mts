import { defineConfig } from 'vitepress';
import { generateIndex, rewrites } from '../utils/posts-loader.ts';
// https://vitepress.dev/reference/site-config

export default defineConfig({
    title: "Trudbot's Blog",
    description: "trudbot的博客",
    lang: 'zh-CN',
    rewrites,
    head: [
        ['link', { rel: 'icon', href: 'https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407082112768.jpg' }]
    ],
    themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
        logo: 'https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311131854196.webp',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about' },
            { text: 'ZhiHu', link: 'https://www.zhihu.com/people/qu-ge-sha-ming-hao-ni-30'}
        ],
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        sidebar: generateIndex('_posts', -1).items,

        search: {
            provider: 'local'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/trudbot' },
            { icon: 'npm', link: 'https://www.npmjs.com/org/trudbot' },
        ],
        returnToTopLabel: '返回顶部'
    },
    ignoreDeadLinks: false,
    markdown: {
        math: true
    },
    srcExclude: [
        'README.md',
        './scripts',
    ],
    vite: {
        resolve: {
            // 组件重写
            alias: [
                // {
                //   find: /^.*\/VPDocFooterLastUpdated\.vue$/,
                //   replacement: fileURLToPath(
                //     new URL('./components/lastUpdated.vue', import.meta.url)
                //   )
                // }
            ]
        }
    },

    sitemap: {
        hostname: 'https://trudbot.cn/Blog/'
    },
});
