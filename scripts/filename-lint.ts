import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import {traversal} from '../utils/fs-utils.js';
import { logger } from '../utils/logger.js';

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
                logger.warn('重命名', `${path.basename(pth)} -> ${path.basename(newFileName)}`);
            }
            fs.renameSync(pth, newFileName);
        } catch(e) {
            console.log(e);
            process.exit(1);
        }
    });

    if (renameCount > 0) {
        logger.error('Lint 失败', '已自动修复非法文件名，请检查变更后重新提交。');
        process.exit(1);
    } else {
        logger.success('文件名检查通过');
    }
}