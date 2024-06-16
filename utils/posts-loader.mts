import { DefaultTheme } from 'vitepress';
import { globSync } from 'glob';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { getCurrentFormattedDate } from './date-format.mjs';
import { getDirectories } from './fs-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../');

export function generatePostListSync(dir: string): {text: string, link: string}[] {
  const files = globSync('*.md', {
    cwd: path.resolve(root, dir)
  });

  const posts: {text: string, link: string}[] = [];

  for (const file of files) {
    const pth = path.resolve(root, dir, file);
    const content = matter.read(pth);
    const frontmatter = content.data || {};
    const title = frontmatter.title || file.replace(/\.md$/, '');
    const link = path.join('/', dir, file.replace(/\.md$/, ''));
    // 必须要有如2023-03-01 16:49:12格式的日期， 没有的话以当前时间写入文件中
    let date = frontmatter.date;

    if (!date) {
      date = getCurrentFormattedDate();
      frontmatter.date = date;
      // 将更新后的 frontmatter 写回到文件中
      const updatedContent = matter.stringify(content.content, frontmatter);
      fs.writeFileSync(pth, updatedContent);
    }

    const top = frontmatter.top || 0;

    posts.push({text: title, link, date, top});
  }
  // 优先级越高越靠前， 否则日期越近越靠前
  return posts.sort((a, b) => {
    if (a.top !== b.top) {
      return b.top - a.top;
    }
    return a.date > b.date ? -1 : 1;
  }).map(({text, link}) => ({text, link}));
}

/**
 *
 * @param dir 目录路径
 * @param text 目录名称
 */
export function generateIndex(dir: string, depth: number = 0, text?: string, more?: any): DefaultTheme.SidebarItem {
  const subDirs = getDirectories(path.resolve(root, dir));
  const subDirIndex = subDirs.map(subDir => generateIndex(path.join(dir, subDir), depth + 1));
  return {
    text: text || path.basename(dir),
    items: [...subDirIndex, ...generatePostListSync(dir)],
    collapsed: depth === 0,
    ...more
  }
}
