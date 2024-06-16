import fs from 'fs';
import path from 'path';

export function getDirectories(srcPath: string): string[] {
  return fs.readdirSync(srcPath)
    .filter((file) => {
      const fullPath = path.join(srcPath, file);
      return fs.statSync(fullPath).isDirectory();
    });
}