import { AxiosResponse } from 'axios'
import request from '../utils/request'

export function getPostMetaInfoList(): Promise<AxiosResponse<PostMetaInfo>> {
    return request({
        url: '/posts/meta',
        method: 'get'
    })
}