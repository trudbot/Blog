---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Trudbot's Blog"
  image:
    src: https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407082112768.jpg
    alt: trudbot
  actions:
    - theme: brand
      text: 进入博客
      link: /_posts/博客/Readme
    - theme: alt
      text: Github
      link: https://github.com/trudbot

features:
  - title: 前端切图仔
    details: 精通JavaScript的拼写
  - title: 竞赛算法蒟蒻
    details: 偶尔刷刷leetcode、atcoder
  - title: 拖延症患者
    details: 明天再干吧
---

<script setup>
import Tags from './views/tags.vue';
import Beian from './views/beian.vue';
import {data} from './data/content-handler.data.mts'
</script>

<!--代码语言统计-->
<div style="display: flex; justify-content: center" class="code-lang">
    <img :src="data"/>
</div>

<style>
.code-lang {
    margin-top: 5vh;
    img {
        width: 50%;
        height: auto;
    }

    @media (max-width: 768px) {
        img {
            width: 80%;
        }
    }
}
</style>

<Tags/>
<Beian/>
