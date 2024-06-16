import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { generateIndex } from '../utils/posts-loader.mjs';
// https://vitepress.dev/reference/site-config

export default withMermaid(defineConfig({
  title: "Trudbot's Blog",
  description: "trudbot的博客",
  head: [
    ['link', { rel: 'icon', href: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/68d0b48ba4f1cf004059144fa0fccc78.jpg' }]
  ],
  base: '/Blog/',
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
  ignoreDeadLinks: true,
  markdown: {
    math: true
  },
  srcExclude: [
    '.README.md',
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
  // optionally, you can pass MermaidConfig
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: "mermaid trudbot-mermaid", // set additional css classes for parent container
  },
}));
