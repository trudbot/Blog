import { AxiosResponse } from 'axios'
import request from '../utils/request'
import {PostEntity, PostMetaInfoEntity, } from "ts-api-models/lib/response";

export function getPostMetaInfoList(): Promise<AxiosResponse<PostMetaInfoEntity[]>> {
    return request({
        url: '/posts/meta',
        method: 'get'
    })
}

export function getPostById(query: {id: number}): Promise<AxiosResponse<PostEntity>> {
    return request({
        url: '/posts/getById',
        method: 'get',
        params: query
    })
}