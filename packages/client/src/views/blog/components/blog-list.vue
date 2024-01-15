<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {PostMetaInfoEntity} from "ts-api-models/lib/response";
import {getPostMetaInfoList} from "../../../apis/posts.api.ts";
import {useRouter} from "vue-router";
import BlogItem from "./blog-item.vue";
const router = useRouter();
// router.push({
//   name: "blog-view",
// })
const postMeta = ref<PostMetaInfoEntity[]>([]);
onMounted(() => {
    getPostMetaInfoList().then(res => {
        postMeta.value = res.data;
        console.log(postMeta.value);
        
    });
})
const a = "# 开发时要注意的换行符问题\n\n在如今我们习惯于使用智能的跨平台工具的背景下， 不同平台换行符差异的问题被隐藏， 对其的忽视也往往导致一些问题。\n\n此文系[npa-tool/issue/1](https://github.com/trudbot/npa-tool/issues/1)的总结。\n\n## 换行符不同的原因\n\n在ascii码中， 有两个很相似的不可见字符： \n\n\n\n| ascii码值 |            缩写             |  解释  |\n| :-------: | :-------------------------: | :----: |\n|    10     | LF (NL line feed, new line) | 换行键 |\n|    13     |    CR (carriage return)     |  回车  |\n\nLF也就是常见的`\\n`, 而CR则是`\\r`\n\n回车和换行有什么区别呢？在我们印象中似乎它们都是换行的作用。\n\n> 在计算机还没有出现之前，有一种叫做**电传打字机**（Teletype Model 33）的玩意儿，每秒钟可以打 10 个字符。但是它有一个问题，就是打完一行换行的时候，要用去 0.2 秒，正好可以打两个字符。要是在这 0.2 秒里面，又有新的字符传过来，那么这个字符将丢失。\n>\n> 于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做\"回车\"，告诉打字机把打印头定位在左边界；另一个叫做\"换行\"，告诉打字机把纸向下移一行。\n>\n> 这就是\"换行\"和\"回车\"的来历，从它们的英语名字上也可以看出一二。\n\n总而言之， 回车是让光标在横轴上回到0的位置， 而换行则是让光标在纵轴上下移一行。\n\n计算机发明后， 这两个概念就被搬到了计算机上， 作为文本排版的特殊控制字符。\n\n但不同操作系统， 在“换行”这一排版需求使用的标识上有差异。\n\n| 操作系统  |   换行标识   |\n| :-------: | :----------: |\n|  Windows  | CRLF: `\\r\\n` |\n|  古早Mac  |   CR: `\\r`   |\n| Mac\\linux |   LF: `\\n`   |\n\n这种差异就导致了， 在A系统上创建编辑的文件， 在B系统上打开时， 会出现错乱。\n\n但目前的主流编辑器都支持多种换行标识， 作为用户的我们其实是感知不到的。\n\n## git跨平台开发\n\n进行跨平台开发时， 换行符不同导致了代码文件不同， 想想就很严重。\n\n虽然大部分编程语言并不在意那些不可见字符， 但还是有部分情况会导致错误。\n\n如`shell`脚本， `nodejs`脚本的首行脚本标识， 如果是windows的CRLF换行符， 都会产生错误。\n\n### autocrlf\n\ngi t考虑到了这一点， 并为windows开发者提供了配置选项。\n\n在git配置选项中， 有属性`core.autocrlf `,  取值及含义如下：\n\n| 取值  |                             含义                             |                             人话                             | 适用场景                                                     |\n| :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ |\n| true  | 当将文件add进入暂存区时， 会自动将CRLF替换为LF。当将文件checkout进入你的计算机时， 会将换行符变为CRLF。 | push到远程仓库时的是替换成LF的文件， pull下来的文件会替换为CRLF | 只推荐windows用户使用， 也是windows版本的默认选项。          |\n| Input |      commit时会将CRLF修复为LF， 而checkout时不会转换。       | push到远程仓库时的是替换成LF的文件， pull下来的文件不做处理  | 一般只推荐mac/linux用户使用， 是Mac/linux的默认选项。        |\n| false |                      不对换行符做处理。                      |                      不对换行符做处理。                      | 当确定所有协作人员都使用windows开发时， 或者含有非文本文件担心出错时 ，才建议选择使用。 |\n\n### .gitattributes\n\n全局配置gi t的autocrlf只能规范自己的行为, 但我们往往希望协作的团队都能轻松地遵循一致的规范。\n\n可以通过`.gitattributes`文件， 在仓库作用域下配置git。\n\n如：\n\n```\n*.js text eol=lf\n```\n\n告诉git， 任何以`.js`结尾的文件都是text类型， 换行符设置为`LF`。\n\n设置 text: checkin时会将crlf转换为lf\n\n设置eol=lf: checkout时不会做转换\n\n如此设置， 便可以保证项目的文件在所有平台都将以lf作为换行符。\n\n更多配置可见**参考**中的git官方文档。\n\n## npm包跨平台共享\n\n这也是我本次遇到的问题。\n\n众所周知， npm 主要用于分发`js/nodejs`代码。\n\n当你将包发布到npm上时， npm并不会对你的文件换行符进行处理。\n\n当用户在另一个平台下载时， 是否会出现问题呢？\n\n通常来说， node/浏览器并不在意你使用了什么换行符。\n\n但当你在mac/linux下运行node脚本时(文件开头有`#! /usr/bin/env node`), 如果`node`后是`\\r\\n`,  将会报错:\n\n```bash\nenv: node\\r: No such file or directory\n```\n\n这是相当严重的问题， 意味着windows中创建的node脚本不能在mac/linux下运行。\n\n但实际上， npm/pnpm考虑到了这一点，从[npm@5.4](https://github.com/npm/npm/issues/12371)开始，  npm在下载包时， 会自动将换行符替换为正确的风格。\n\n但yarn-1仍然存在这个问题。\n\n如果你用windows开发， 且包中含有node脚本， 并且希望用户能通过yarn-1下载使用， 确保发布时， 将换行符替换为了LF。\n\n## 参考\n\n[理解 CRLF，LF——简书](https://www.jianshu.com/p/ec9564fe1c2b)\n\n[Customizing Git - Git Configuration](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)\n\n[Node script executable not working on Mac : env: node\\r: No such file or directory](https://stackoverflow.com/questions/30344858/node-script-executable-not-working-on-mac-env-node-r-no-such-file-or-directo)\n\n[文本或代码中 \\n 和 \\r 的区别](https://cloud.tencent.com/developer/article/1755544)\n\n[令人困擾的Git Autocrlf](https://blog.opasschang.com/confusing-git-autocrlf/)\n\n[.gitattributes](https://git-scm.com/docs/gitattributes)"

</script>

<template>
  <div class="blog-list">
    <div>
      <blog-item 
        v-for="item in postMeta" 
        :key="item.post_id" 
        class="post-item"
        :title="item.post_title"
      >

      </blog-item>
    </div>
    <div>
      abc
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../mixin";

.blog-list {
  @include fill-up;
  overflow: scroll;
  @include hide-scrollbar;
  padding-top: 10vh;
  display: grid;
  grid-template-columns: 7fr 3fr;

  .post-item {
    height: 10vh;

    .post-title {
      font-size: 3rem;
    }
  }
}

</style>