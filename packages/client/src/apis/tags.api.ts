import request from '@/utils/request.ts';
import { AxiosResponse } from 'axios';
import { PostEntity, TagData } from 'ts-api-models/lib/response';

export function getPostsByTag(tag: string): Promise<AxiosResponse<PostEntity[]>> {
    return request({
        url: `/tag/getPosts/${tag}`,
        method: 'get'
    })
}

export function getAllTags(): Promise<AxiosResponse<TagData[]>> {
    return request({
        url: '/tag/getAll',
        method: 'get'
    })
}