/**
 * 无依赖的埋点发送核心。三条硬约束：
 *  1. beacon 优先：用 navigator.sendBeacon 发送，fire-and-forget，能在页面卸载/跳转时送出。
 *  2. 绝不影响页面：整条链路吞掉所有异常，SSR 阶段直接 no-op，且不写 console。
 *  3. 小而稳的类型化接口：调用方只用 trackDisplay/trackExposure/trackClick + 自定义参数。
 */

import { getUid } from './uid';

export type TrackEventType = 'display' | 'exposure' | 'click';

export type TrackParams = Record<string, unknown>;

// 构建期可用 VITE_LOG_ENDPOINT 覆盖，默认指向生产日志端点。
const ENDPOINT =
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env
        ?.VITE_LOG_ENDPOINT ?? 'https://api.trudbot.cn/log';

function deliver(body: string): void {
    // 纯字符串以 text/plain 发送（CORS 安全名单），跨域不触发预检；
    // 服务端按原始 body 解析 JSON，不依赖 Content-Type。
    if (
        typeof navigator !== 'undefined' &&
        typeof navigator.sendBeacon === 'function' &&
        navigator.sendBeacon(ENDPOINT, body)
    ) {
        return;
    }

    // sendBeacon 不可用或拒绝时回退；keepalive 让请求存活到页面卸载后，
    // no-cors 使其保持“简单请求”且无需读取响应。
    if (typeof fetch === 'function') {
        void fetch(ENDPOINT, {
            method: 'POST',
            body,
            keepalive: true,
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        }).catch(() => undefined);
    }
}

export function track(type: TrackEventType, name: string, params?: TrackParams): void {
    // SSG/SSR 阶段 no-op；任何失败都不允许抛回调用方。
    if (typeof window === 'undefined') return;
    try {
        const body = JSON.stringify({
            type,
            // 客户端事件时间即交互发生时刻；服务端另记接收时间并补 ip/geo/时区/语言。
            timestamp: Date.now(),
            params: {
                name,
                page: window.location.pathname,
                // 持久化访客 id（FingerprintJS）；首访解析完成前为 undefined，
                // JSON.stringify 会自动忽略该键。
                uid: getUid(),
                ...params,
            },
        });
        deliver(body);
    } catch {
        // 打点失败必须完全静默：既不影响页面，也不污染 console。
    }
}

export const trackDisplay = (name: string, params?: TrackParams): void =>
    track('display', name, params);

export const trackExposure = (name: string, params?: TrackParams): void =>
    track('exposure', name, params);

export const trackClick = (name: string, params?: TrackParams): void =>
    track('click', name, params);
