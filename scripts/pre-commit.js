const { execSync } = require('child_process');
const path = require('path');
const matter = require('gray-matter');
const fs = require('fs');
const chalk = require('chalk');
const { minimatch } = require('minimatch');

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function decodeUtf8(str) {
  str = str.replace(/\\(\d{3})/g, (match, octal) => {
    return String.fromCharCode(parseInt(octal, 8));
  });
  return Buffer.from(str, 'latin1').toString('utf8');
}

/**
 * 在md文件的frontmatter中更新lastUpdated字段
 */
try {
  // 获取本次提交修改过的文件列表
  const modifiedFiles = execSync('git diff --cached --name-only', {encoding: 'utf-8'})
    .trim()
    .split('\n')
    .filter(file => file)
    .map(filePath => {
      if (filePath.startsWith(`"`)) {
        filePath = filePath.slice(1);
      }
      if (filePath.endsWith(`"`)) {
        filePath = filePath.slice(0, -1);
      }
      return filePath;
    }).map(decodeUtf8);

  const mdFiles = modifiedFiles.filter(file => minimatch(file, '_posts/**/*.md'));
  console.log(chalk.blue.bold('本次提交修改的文件: '), modifiedFiles);
  console.log(chalk.blue.bold('在_posts中的md文件:'), mdFiles);
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
      console.log(chalk.green(`文件[${chalk.bold(fileName)}]的title字段为空, 已更新为文件名`));
    }

    // 更新lastUpdated字段
    frontmatter.lastUpdated = formatDate(stats.mtime);
    console.log(chalk.green(`文件[${chalk.bold(fileName)}]的lastUpdated字段已更新`));

    if (!frontmatter.date) {
      const creationTime = stats.birthtime;
      frontmatter.date = formatDate(creationTime);
      console.log(chalk.green(`文件[${chalk.bold(fileName)}]的date字段为空, 已更新为文件创建时间`));
    }

    const newContent = matter.stringify(fileContent.content, frontmatter);
    
    // 写入文件
    fs.writeFileSync(pth, newContent, {encoding: 'utf-8'});
  });

  if (mdFiles.length > 0) {
    execSync(`git add ${mdFiles.map(file => `"${file}"`).join(' ')}`);
  } else {
    console.log(chalk.green.bold('没有需要更新的文件, pre-commit结束')); 
  }

  console.log(chalk.green.bold('Pre-commit hook completed successfully.'));
  process.exit(0);
} catch (error) {
  console.error(chalk.red.bold('Error running pre-commit hook:'), error);
  process.exit(1);
}
