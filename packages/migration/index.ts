import axios from "axios";
import Hexo from "hexo2json"
import fs from "fs";
import {CreatePost_Post} from "ts-api-models/lib/request";
import * as path from "path";
import {CategoryEntity} from "ts-api-models/lib/response";

const targetDir: string = "/Users/songyiping03/trudbot_blog/source/_posts";
const base_url = "http://localhost:4000";
const createCategoriesUrl: string = `${base_url}/categories/multiCreate`;
const createPostsUrl: string = `${base_url}/posts/create`;
const addPostsUrl: string = `${base_url}/categories/addPosts`;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

async function addBlog(blog: ReturnType<typeof Hexo.parse>, blogName: string) {
    const tags = blog.meta.tags ? [].concat(blog.meta.tags) : [];
    const post: CreatePost_Post = {
        post_content: blog.desc + '\n' + blog.content,
        post_title: blogName,
        tags: tags,s
        publish_date: blog.meta.date || new Date(),
    }
    const postE = (await axios.post(createPostsUrl, post)).data;
    let categories: string[] = [];
    if (blog.meta.categories) {
        categories = categories.concat(blog.meta.categories);
    }
    if (categories.length > 0) {
        const res: {data: CategoryEntity} = await axios.post(
            createCategoriesUrl,
            categories.map(name => ({name}))
        );
        const category_id = res.data.category_id;
        await axios.post(addPostsUrl, {category_id, post_ids: postE.post_id});
    }
}

function fileHandler(pth: string, content: string) {
    if (!pth.endsWith(".md")) {
        console.log('非md文件，跳过');
        return new Promise<void>((resolve) => resolve());
    }
    const fileName = path.basename(pth);
    const blogName = fileName.split('.')[0];
    return addBlog(Hexo.parse(content), blogName)
}

// 定义回调函数类型
type FileCallback = (filePath: string, content: string) => void;

// 遍历指定文件夹下的所有 md 文件
function traverseMarkdownFiles(folderPath: string, callback: FileCallback): void {
    // 获取文件夹下所有文件和子文件夹
    const items = fs.readdirSync(folderPath);

    items.forEach((item) => {
        const itemPath = path.join(folderPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            // 递归处理子文件夹
            traverseMarkdownFiles(itemPath, callback);
        } else {
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
    fileHandler(pth, content).then(
    ).catch(e => {
        console.log(pth, '失败');
        console.log(e)
    })
});
