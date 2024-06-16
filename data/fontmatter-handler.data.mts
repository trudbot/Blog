import { ContentData, createContentLoader } from 'vitepress';
import { MapFunctionReturnTypes } from '../utils/ts-utils';

const {watch, load} = createContentLoader([
  '_posts/**/*.md',
]);

function getTagsData(data: ContentData[]) {
  const count = new Map<string, number>();
  data.map(content => {
    const frontmatter = content.frontmatter;
    if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) return;
    (frontmatter.tags as Array<string>).forEach(tag => {
      count.set(tag, (count.has(tag) ? count.get(tag)! : 0) + 1);
    });
  });
  const list = Array.from(count, ([text, size]) => ({ text, size }));
  return {list};
}

const handlerList = [
  getTagsData,
]

export default {
  watch,
  load: async (): Promise<MapFunctionReturnTypes<typeof handlerList>> => {
    const contents = await load();
    return handlerList.map(handler => handler(contents));
  }
}

export type Data  = MapFunctionReturnTypes<typeof handlerList>;
declare const data: Data
export { data }