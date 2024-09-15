const path = require('path');
const root = path.resolve(__dirname, '..');
const fs = require('fs');
const sanitize = require("sanitize-filename");
const chalk = require('chalk');

function traversal(root, callback) {
    fs.readdirSync(root).map(item => {
        const pth = path.join(root, item);
        if (fs.statSync(pth).isDirectory()) {
            traversal(pth, callback);
        }
        callback?.(pth);
    });
}

function fileNameLint(pth) {
    const fileName = path.basename(pth, path.extname(pth));
    const newFileName =  sanitize(fileName, {
        replacement: '-'
    });
    return path.join(path.dirname(pth), newFileName + path.extname(pth));
}

function lint(){
    let renameCount = 0;
    traversal(path.join(root, '_posts'), pth => {
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

module.exports = {
    lint
};