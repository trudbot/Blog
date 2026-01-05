import { execSync } from 'child_process';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import chalk from 'chalk';
import { minimatch } from 'minimatch';
import { lint } from './filename-lint.js';
import {formatDate} from '../utils/date-format.js';
import { genPostId } from '../utils/post-id';

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
    console.log(chalk.bgCyan.black.bold(' 1. Markdown 预处理 '), chalk.gray('(自动补充 frontmatter 信息)'));
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
    console.log(chalk.cyan('  • 本次提交修改的文件: '), modifiedFiles);
    console.log(chalk.cyan('  • 在_posts中的md文件:'), mdFiles);
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
            console.log(chalk.green('    ✔ 更新 Title: ') + chalk.yellow(fileName));
        }

        // 更新lastUpdated字段
        frontmatter.lastUpdated = formatDate(stats.mtime);
        console.log(chalk.green('    ✔ 更新 LastUpdated: ') + chalk.yellow(fileName));

        if (!frontmatter.date) {
            const creationTime = stats.birthtime;
            frontmatter.date = formatDate(creationTime);
            console.log(chalk.green('    ✔ 更新 Date: ') + chalk.yellow(fileName));
        }

        if (!frontmatter.id) {
            frontmatter.id = genPostId();
            console.log(chalk.green('    ✔ 生成 ID: ') + chalk.yellow(fileName));
        }

        const newContent = matter.stringify(fileContent.content, frontmatter);
    
        // 写入文件
        fs.writeFileSync(pth, newContent, {encoding: 'utf-8'});
    });

    if (mdFiles.length > 0) {
        execSync(`git add ${mdFiles.map(file => `"${file}"`).join(' ')}`);
    } else {
        console.log(chalk.gray('  - 没有需要更新的文件')); 
    }

    console.log('\n' + chalk.bgCyan.black.bold(' 2. FileName Lint '), chalk.gray('(检查文件名兼容性)'));
    lint();
    console.log('\n' + chalk.green.bold('✨ Pre-commit hook completed successfully.'));
    process.exit(0);
} catch (error) {
    console.error('\n' + chalk.red.bold('✖ Error running pre-commit hook:'), error);
    process.exit(1);
}
