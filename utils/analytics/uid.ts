/**
 * 基于 FingerprintJS（开源版）的稳定访客标识。
 *
 * 指纹在客户端计算（无服务端、无 cookie），随后缓存到 localStorage，
 * 之后的页面加载可同步读取。与其余埋点一致：尽力而为，任何失败都返回
 * undefined，绝不抛错、不写 console，保证不阻塞、不影响页面。
 *
 * uid 标识“同一浏览器跨会话”；sid（在 tracker 中）标识“单次页面会话”。
 * 事件按可用情况携带其一或两者。
 */

const STORAGE_KEY = '__log_uid';

let cached: string | undefined;
let inflight: Promise<string | undefined> | undefined;

export function getUid(): string | undefined {
    if (cached) return cached;
    if (typeof localStorage === 'undefined') return undefined;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            cached = stored;
            return stored;
        }
    } catch {
        // localStorage 可能抛错（隐私模式/被禁用），视为不存在。
    }
    return undefined;
}

async function resolveUid(): Promise<string | undefined> {
    try {
        const { default: FingerprintJS } = await import('@fingerprintjs/fingerprintjs');
        const agent = await FingerprintJS.load();
        const { visitorId } = await agent.get();
        cached = visitorId;
        try {
            localStorage.setItem(STORAGE_KEY, visitorId);
        } catch {
            // 持久化仅为优化，失败时仍有内存缓存。
        }
        return visitorId;
    } catch {
        // 指纹计算失败不得影响页面、不得写 console。
        return undefined;
    } finally {
        inflight = undefined;
    }
}

/** 解析访客 id，首次调用时按需加载 FingerprintJS；并发去重。 */
export function ensureUid(): Promise<string | undefined> {
    if (typeof window === 'undefined') return Promise.resolve(undefined);
    const existing = getUid();
    if (existing) return Promise.resolve(existing);
    inflight ??= resolveUid();
    return inflight;
}
