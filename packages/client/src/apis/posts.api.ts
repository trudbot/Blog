import { AxiosResponse } from 'axios'
import request from '../utils/request'
import {PostMetaInfoEntity} from "ts-api-models/lib/response";

export function getPostMetaInfoList(): Promise<AxiosResponse<PostMetaInfoEntity[]>> {
    return request({
        url: '/posts/meta',
        method: 'get'
    })
}