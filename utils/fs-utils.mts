import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

export function getDirectories(srcPath: string): string[] {
  return fs.readdirSync(srcPath)
    .filter((file) => {
      const fullPath = path.join(srcPath, file);
      return fs.statSync(fullPath).isDirectory();
    });
}

export function loadFiles(globPattern: string, callback: (content: string) => void): string[] {
  globSync(globPattern).forEach(pth => {
    const content = fs.readFileSync(pth, 'utf-8');
    callback(content);
  });
}