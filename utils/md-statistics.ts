type MarkdownContent = string;

function extractDomain(url: string): string | null {
  if (URL.canParse(url)) {
    return new URL(url).hostname;
  }
  return null;
}

export function linkSource(contents: MarkdownContent) {
  const pattern = /(?<!\!)\[(.*?)\]\((.*?)\)/g;

  const matches = contents.matchAll(pattern);
  const cnt = new Map<string, number>();
  // 输出匹配结果
  for (const match of matches) {
    const desc = match[1];
    const url = extractDomain(match[2]) || 'unknown';
    cnt.set(url, (cnt.get(url) || 0) + 1);
  }
  return Array.from(cnt.entries()).map(([url, count]) => ({url, count}));
}

export function matchCodeBlocks(markdown: string): Array<{language: string, code: string}> {
  const regex = /```([\w+]+)?\s([\s\S]*?)```/g;
  let match;
  const matches: Array<{language: string, code: string}> = [];

  while ((match = regex.exec(markdown)) !== null) {
    matches.push({
      language: match[1] || 'text',
      code: match[2],
    });
  }

  return matches;
}

// import * as fs from 'fs'

// const content = fs.readFileSync('_posts/博客/FFT.md', 'utf-8');
// console.log(linkSource(content));
// console.log(matchCodeBlocks(content));