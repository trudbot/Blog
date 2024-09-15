const path = require('path');

let filePath = process.argv[2];
filePath = filePath.replace(/\.md$/, '');

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function writeFileEnsureDir(filePath, data) {
    const dir = path.dirname(filePath);

    // 检查并创建目录
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, data, 'utf8');
}

const matter = require('gray-matter');
const fs = require('fs');

const post = {
    data: {},
    content: ''
};

post.data.date = formatDate(new Date());
post.data.title = path.basename(filePath);
post.data.top = 0;

const content = matter.stringify(post.content, post.data);
const pth = `${filePath}.md`;

writeFileEnsureDir(path.join('_posts', pth), content);