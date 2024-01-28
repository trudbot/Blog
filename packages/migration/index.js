var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import Hexo from 'hexo2json';
import fs from 'fs';
import * as path from 'path';
const targetDir = "/Users/songyiping03/trudbot_blog/source/_posts";
// const base_url = "https://api.trudbot.cn";
const base_url = "http://localhost:4000";
const createCategoriesUrl = `${base_url}/categories/multiCreate`;
const createPostsUrl = `${base_url}/posts/create`;
const addPostsUrl = `${base_url}/categories/addPosts`;
function addBlog(blog, blogName) {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = blog.meta.tags ? [].concat(blog.meta.tags) : [];
        const post = {
            post_content: blog.desc + '\n' + blog.content,
            post_title: blogName,
            tags: tags,
            publish_date: blog.meta.date || new Date(),
        };
        const postE = (yield axios.post(createPostsUrl, post)).data;
        let categories = [];
        if (blog.meta.categories) {
            categories = categories.concat(blog.meta.categories);
        }
        if (categories.length > 0) {
            const res = yield axios.post(createCategoriesUrl, categories.map(name => ({ name })));
            const category_id = res.data.category_id;
            yield axios.post(addPostsUrl, { category_id, post_ids: postE.post_id });
        }
    });
}
function fileHandler(pth, content) {
    if (!pth.endsWith(".md")) {
        console.log('非md文件，跳过');
        return new Promise((resolve) => resolve());
    }
    const fileName = path.basename(pth);
    const blogName = fileName.split('.')[0];
    return addBlog(Hexo.parse(content), blogName);
}
// 遍历指定文件夹下的所有 md 文件
function traverseMarkdownFiles(folderPath, callback) {
    // 获取文件夹下所有文件和子文件夹
    const items = fs.readdirSync(folderPath);
    items.forEach((item) => {
        const itemPath = path.join(folderPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();
        if (isDirectory) {
            // 递归处理子文件夹
            traverseMarkdownFiles(itemPath, callback);
        }
        else {
            // 检查是否是 Markdown 文件
            if (path.extname(item) === '.md') {
                // 读取文件内容
                const content = fs.readFileSync(itemPath, 'utf-8');
                // 调用回调函数处理文件
                callback(itemPath, content);
            }
        }
    });
}
traverseMarkdownFiles(targetDir, (pth, content) => {
    fileHandler(pth, content).then().catch(e => {
        console.log(pth, '失败');
        console.log(e.response.data);
    });
});
