const { execSync } = require('child_process');
const path = require('path');
const matter = require('gray-matter');
const fs = require('fs');
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

  const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();

  const mdFiles = modifiedFiles.filter(file => minimatch(file, '_posts/**/*.md'));
  console.log('modifiedFiles', modifiedFiles);
  console.log('mdFiles', mdFiles);
  mdFiles.forEach(file => {
    const pth = path.resolve(file);
    const content = fs.readFileSync(pth, {encoding: 'utf-8'});
    const fileContent = matter(content);
    
    // 更新lastUpdated字段
    const frontmatter = fileContent.data || {};
    frontmatter.lastUpdated = formatDate(new Date());
    const newContent = matter.stringify(fileContent.content, frontmatter);
    
    // 写入文件
    fs.writeFileSync(pth, newContent, {encoding: 'utf-8'});
  });

  if (mdFiles.length > 0) {
    execSync(`git add ${mdFiles.map(file => `"${file}"`).join(' ')}`);
  }

  console.log('Pre-commit hook completed successfully.');
  process.exit(0);
} catch (error) {
  console.error('Error running pre-commit hook:', error);
  process.exit(1);
}
