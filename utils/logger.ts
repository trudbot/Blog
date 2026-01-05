import chalk from 'chalk';

export const logger = {
    /**
     * 打印章节标题
     * @param title 标题文本
     * @param subtitle 副标题/说明文本
     */
    section: (title: string, subtitle: string = '') => {
        console.log('\n' + chalk.bgCyan.black.bold(` ${title} `) + (subtitle ? ' ' + chalk.gray(subtitle) : ''));
    },

    /**
     * 打印信息列表项 (带 • 前缀)
     * @param label 标签
     * @param value 值 (可选)
     */
    info: (label: string, value?: object | Array<unknown> | string) => {
        let msg = chalk.cyan(`  • ${label}`);
        if (value !== undefined) {
            // 如果是对象或数组，格式化一下，否则直接拼接
            const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
            msg += ' ' + valStr;
        }
        console.log(msg);
    },

    /**
     * 打印成功/完成的子项 (带 ✔ 前缀)
     * @param label 动作描述
     * @param detail 详细信息 (通常是文件名，会高亮显示)
     */
    success: (label: string, detail?: string) => {
        let msg = chalk.green(`    ✔ ${label}`);
        if (detail) {
            msg += ': ' + chalk.yellow(detail);
        }
        console.log(msg);
    },

    /**
     * 打印警告信息 (带 ⚠ 前缀)
     * @param label 警告描述
     * @param detail 详细信息
     */
    warn: (label: string, detail?: string) => {
        let msg = chalk.yellow(`  ⚠ ${label}`);
        if (detail) {
            msg += ': ' + detail;
        }
        console.log(msg);
    },

    /**
     * 打印错误信息 (带 ✖ 前缀)
     * @param label 错误描述
     * @param error 错误对象或详细信息
     */
    error: (label: string, error?: object | string | Array<unknown>) => {
        console.error('\n' + chalk.red.bold(`✖ ${label}`), error || '');
    },

    /**
     * 打印完成状态 (带 ✨ 前缀)
     * @param message 完成信息
     */
    complete: (message: string) => {
        console.log('\n' + chalk.green.bold(`✨ ${message}`));
    },

    /**
     * 打印灰色的一般信息 (用于无操作等场景)
     * @param message 信息文本
     */
    gray: (message: string) => {
        console.log(chalk.gray(`  - ${message}`));
    }
};
