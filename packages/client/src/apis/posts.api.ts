import { AxiosResponse } from 'axios';
import request from '../utils/request';
import { PostEntity, PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { GetMetaInfo_Query } from 'ts-api-models/lib/request';

export function getPostMetaInfoList(query?: GetMetaInfo_Query): Promise<AxiosResponse<PostMetaInfoEntity[]>> {
    return request({
        url: '/posts/meta',
        method: 'get',
        params: query || {}
    })
}

export function getPostById(query: {id: number}): Promise<AxiosResponse<PostEntity>> {
    return request({
        url: '/posts/getById',
        method: 'get',
        params: query
    })
}