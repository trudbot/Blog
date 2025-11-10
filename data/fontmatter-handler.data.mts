import { ContentData, createContentLoader } from 'vitepress';
import { MapFunctionReturnTypes } from '../utils/ts-utils';
import {EasyMap} from '@trudbot/map';

const {watch, load} = createContentLoader([
    '_posts/**/*.md',
]);

function getTagsData(data: ContentData[]) {
    const count = new EasyMap<string, number>();
    const proxy = count.createProxy(p => {
        return p.toString();
    }, 0);
    data.map(content => {
        const frontmatter = content.frontmatter;
        if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) return;
        (frontmatter.tags as Array<string>).forEach(tag => {
            proxy[tag] ++;
        });
    });
    const list = count.entries().map(({key, value}) => ({ text: key, size: value }));
    return {list};
}

const handlerList = [
    getTagsData,
];

export default {
    watch,
    load: async (): Promise<MapFunctionReturnTypes<typeof handlerList>> => {
        const contents = await load();
        return handlerList.map(handler => handler(contents));
    }
};

export type Data  = MapFunctionReturnTypes<typeof handlerList>;
declare const data: Data;
export { data };