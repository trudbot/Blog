import { loadFiles } from '../utils/fs-utils.mjs';
import { EasyMap } from '@trudbot/map';
import { matchCodeBlocks } from '../utils/md-statistics';
import { pie_base64 } from '../utils/chart';
import { countLines } from '../utils/common';

const langMap = {
    javascript: ['js', 'javascript', 'JavaScript', 'jsx'],
    cpp: ['c++', 'cpp', 'CPP'],
    typescript: ['ts', 'typescript', 'TypeScript', 'tsx'],
    python: ['py', 'python', 'Python'],
    java: ['java', 'Java'],
    go: ['go', 'Go', 'golang'],
    rust: ['rs', 'rust', 'Rust'],
    html: ['html', 'HTML', 'htm'],
    css: ['css', 'CSS', 'scss', 'Sass', 'sass', 'less', 'Less'],
    shell: ['sh', 'bash', 'Shell', 'zsh'],
    text: ['text', 'Text', 'txt', 'Txt', 'plaintext', 'Plaintext', 'in', 'out'],
};

const getStdLang = (lang: string) => {
    for (const [stdLang, variants] of Object.entries(langMap)) {
        if (variants.includes(lang)) {
            return stdLang;
        }
    }
    return lang;
};

export default {
    async load() {
        const count = new EasyMap<string, number>();
        const proxy = count.createProxy(p => {
            return typeof p === 'string' ? p : p.toString();
        }, 0);
        loadFiles('_posts/**/*.md', (content) => {
            matchCodeBlocks(content).forEach(({language, code}) => {
                proxy[getStdLang(language)] += countLines(code);
            });
        });
        const pieData = {
            label: count.keys(),
            data: count.values()
        };
        return await pie_base64(pieData.label, pieData.data);
    }
};

declare const data: [{lang :string, count: number}];
export { data };