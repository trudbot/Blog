// const path = require('path');
// const matter = require('gray-matter');
// const fs = require('fs');
import path from 'node:path';
import matter from 'gray-matter';
import {formatDate} from '../utils/date-format';
import { genPostId } from '../utils/post-id';
import { writeFileEnsureDir } from '../utils/fs-utils';

let filePath = process.argv[2];
filePath = filePath.replace(/\.md$/, '');

const post: {data: {date: string; title: string; top: number; id: string;}; content: string} = {
    data: {
        date: '',
        title: '',
        top: 0,
        id: ''
    },
    content: ''
};

post.data.date = formatDate(new Date());
post.data.title = path.basename(filePath);
post.data.top = 0;
post.data.id = genPostId();

const content = matter.stringify(post.content, post.data);
const pth = `${filePath}.md`;

writeFileEnsureDir(path.join('_posts', pth), content);