import { execSync } from 'child_process';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { minimatch } from 'minimatch';
import { lint } from './filename-lint.js';
import {formatDate} from '../utils/date-format.js';
import { genPostId } from '../utils/post-id';
import { logger } from '../utils/logger.js';

function decodeUtf8(str: string): string {
    str = str.replace(/\\(\d{3})/g, (_match: string, octal: string) => {
        return String.fromCharCode(parseInt(octal, 8));
    });
    return Buffer.from(str, 'latin1').toString('utf8');
}

/**
 * 在md文件的frontmatter中更新lastUpdated字段
 */
try {
    logger.section('1. Markdown 预处理', '(自动补充 frontmatter 信息)');
    // 获取本次提交修改过的文件列表
    const modifiedFiles = execSync('git diff --cached --name-only', {encoding: 'utf-8'})
        .trim()
        .split('\n')
        .map(filePath => {
            if (filePath.startsWith(`"`)) {
                filePath = filePath.slice(1);
            }
            if (filePath.endsWith(`"`)) {
                filePath = filePath.slice(0, -1);
            }
            return filePath;
        }).map(decodeUtf8);

    const mdFiles = modifiedFiles.filter(file => minimatch(file, '_posts/**/*.md')).filter(file => fs.existsSync(file));
    logger.info('本次提交修改的文件: ', modifiedFiles);
    logger.info('在_posts中的md文件:', mdFiles);
    mdFiles.forEach(file => {
        const pth = path.resolve(file);
        const content = fs.readFileSync(pth, {encoding: 'utf-8'});
        const stats = fs.statSync(pth);
        const fileContent = matter(content);
        const fileName = path.basename(file).replace(/\.md$/, '');
        const frontmatter = fileContent.data || {};
    
        // 无title字段则使用文件名
        if (!frontmatter.title) {
            frontmatter.title = fileName;
            logger.success('更新 Title', fileName);
        }

        // 更新lastUpdated字段
        frontmatter.lastUpdated = formatDate(stats.mtime);
        logger.success('更新 LastUpdated', fileName);

        if (!frontmatter.date) {
            const creationTime = stats.birthtime;
            frontmatter.date = formatDate(creationTime);
            logger.success('更新 Date', fileName);
        }

        if (!frontmatter.id) {
            frontmatter.id = genPostId();
            logger.success('生成 ID', fileName);
        }

        const newContent = matter.stringify(fileContent.content, frontmatter);
    
        // 写入文件
        fs.writeFileSync(pth, newContent, {encoding: 'utf-8'});
    });

    if (mdFiles.length > 0) {
        execSync(`git add ${mdFiles.map(file => `"${file}"`).join(' ')}`);
    } else {
        logger.gray('没有需要更新的文件'); 
    }

    logger.section('2. FileName Lint', '(检查文件名兼容性)');
    lint();
    logger.complete('Pre-commit hook completed successfully.');
    process.exit(0);
} catch (error) {
    logger.error('Error running pre-commit hook:', error);
    process.exit(1);
}
