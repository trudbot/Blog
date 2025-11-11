import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import chalk from 'chalk';
import {traversal} from '../utils/fs-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function fileNameLint(pth: string) {
    const fileName = path.basename(pth, path.extname(pth));
    const newFileName =  sanitize(fileName, {
        replacement: '-'
    });
    return path.join(path.dirname(pth), newFileName + path.extname(pth));
}

export function lint() {
    let renameCount = 0;
    traversal(path.join(root, '_posts'), (pth: string) => {
        try {
            const newFileName = fileNameLint(pth);
            if (pth !== newFileName) {
                renameCount ++;
            }
            fs.renameSync(pth, newFileName);
        } catch(e) {
            console.log(e);
            process.exit(1);
        }
    });

    if (renameCount > 0) {
        console.log(chalk.red.bold('filename lint失败, 已自动将路径非法字符改为"-", 请在git中review'));
        process.exit(1);
    } else {
        console.log(chalk.green.bold('filename lint完成, 没有不兼容的目录或文件名'));
    }
}