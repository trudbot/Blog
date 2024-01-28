# Blog

基于vue+nest重写(trudbot.cn)博客.

开始这个project的原因很简单， 有一段时间很闲， 想写点东西；后来不闲了， 还是想方设法地抽时间写。

最开始的想法其实是一比一复刻`trudbot.cn`， 也就是下图。

使用的是烂大街的hexo + nextT主题， 当时的我还不会前端， 配成这样其实也花了我很多精力。

![截屏2024-01-26 上午1.15.46](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-01-26%20%E4%B8%8A%E5%8D%881.15.46.png)

不过在写的过程中， 越来越多自己的想法冒出来， 逐渐的就完全放飞了自己， 开始笨拙地设计每一处细节。

## 介绍

朴实无华的顶栏菜单

![截屏2024-01-26 上午1.51.53](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-01-26%20%E4%B8%8A%E5%8D%881.51.53.png)

首页是一个全屏翻动的组件(不过似乎很难发现可以上下滑动)。

 fullpage里当然就是我的一些介绍啦。

目前只写了blog一栏， 而且还只是半成品:

这是2023 codepen star最多的作品， 我抄了过来抽象为了组件， (事实整个网站上很多内容样式都是来自codepen)。

![截屏2024-01-26 上午1.55.53](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-01-26%20%E4%B8%8A%E5%8D%881.55.53.png)

除了首页和博客页， 就是404了。

当访问不存在的url时， 会随机跳转到一个404页面。

![截屏2024-01-26 上午1.59.07](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/%E6%88%AA%E5%B1%8F2024-01-26%20%E4%B8%8A%E5%8D%881.59.07.png)

当然你也可以刷新`/404`， 去随机显示一个404页面。



## 开发

按想法， 打算从0到1实现博客的客户端、服务端h和管理平台三端， 代码使用pnpm monorepo的方式进行管理。

**客户端**

客户端的技术栈采用了我最熟悉的`vue3`生态 + `ts` + `scss`, 但没有使用任何组件库。

博客嘛， 还需要考虑的技术就是如何实现`markdown`相关(md语法、代码高亮、latex公式渲染等)的实现。

这里我使用了掘金的`markdown`组件库以及相关的主题：

* [bytedance/bytemd](https://github.com/bytedance/bytemd)
* [juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes)

一是bytemd足够无脑;

二是掘金的这些主题早就用过了， 不乏很多很喜欢的;

代码高亮使用`highlight.js`, 公式渲染选择了导入`katex`相关样式； 当然这些都是跟着bytemd文档来的。

---

还有就是标签云, tag页一开始就决定了要做成标签云的形式， 使用了[d3-cloud](https://github.com/jasondavies/d3-cloud)来完成

<img width="1177" alt="截屏2024-01-28 下午3 34 33" src="https://github.com/trudbot/Blog/assets/91862181/fe4379d3-8957-460d-985b-20f1049efdcb">


---

客户端的开发收获嘛， 我想就是多写代码的收获。

比如css一写多， 秉承着工具只用最必要的我， 也不得不尝试写scss的更多特性， 去重构代码。

比如说去思考了究竟什么时刻、怎么去显示loading效果好。

比如markdown主题切换一般应该怎么去做。

**服务端**

服务端使用的开发技术栈是 `nest` + `typeorm` + `ts`。

后面发现`typeorm`已经不是社区首选了， 让位了`primsa`， 后悔莫及。当然这些都是后话了。

其实吧后端之前没咋认真写过， 这次为了实现功能， 可真是认真看了`typeorm`的文档。

收获吧， 应该就是练了一把orm是怎么使用的, 感觉后端糊个接口， 其实没啥太大难度。

**管理端**

admin的开发优先级显然是最低的， 也是相对不重要的那个。

目前虽然还没有开始开发， 但暂定了使用`svelte`。

**部署**

前端部署普普通通， nginx部署单页应用。

后端使用的是pm2进行进程管理,  加上nginx反向代理上https。

这一套下来nginx的常规使用真是比较熟了。
