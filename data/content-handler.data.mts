import { loadFiles } from '../utils/fs-utils.mjs';
import { EasyMap } from '@trudbot/map';
import { matchCodeBlocks } from '../utils/md-statistics';
import { pie_base64 } from '../utils/chart';
import { countLines } from '../utils/common';

export default {
  async load() {
    const count = new EasyMap<string, number>({defaultValue: 0});
    const proxy = count.createProxy(p => {
      return typeof p === 'string' ? p : p.toString();
    });
    loadFiles('_posts/**/*.md', (content) => {
      matchCodeBlocks(content).forEach(({language, code}) => {
        if (language === 'c++') language = 'cpp';
        if (language === 'in' || language === 'out') language = 'text';
        proxy[language] += countLines(code);
      });
    });
    const pieData = {
      label: count.keys(),
      data: count.values()
    };
    return await pie_base64(pieData.label, pieData.data);
  }
}

declare const data: [{lang :string, count: number}];
export { data }