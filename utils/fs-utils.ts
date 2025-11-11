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

export function loadFiles(globPattern: string, callback: (content: string) => void): void {
    globSync(globPattern).forEach(pth => {
        const content = fs.readFileSync(pth, 'utf-8');
        callback(content);
    });
}

export function writeFileEnsureDir(filePath: string, data: string) {
    const dir = path.dirname(filePath);

    // 检查并创建目录
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, data, 'utf8');
}

export function traversal(root: string, callback?: (pth: string) => void) {
    fs.readdirSync(root).map(item => {
        const pth = path.join(root, item);
        if (fs.statSync(pth).isDirectory()) {
            traversal(pth, callback);
        }
        callback?.(pth);
    });
}