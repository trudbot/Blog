import { track, type TrackParams } from './track';

export interface PageInfo {
    path: string;
    title?: string;
    isArticle: boolean;
    // 该页所有事件共享的附加参数（文章 id、tags、categories 等）。
    meta?: TrackParams;
}

interface Session {
    info: PageInfo;
    // 单次访问的标识，用于把同一次展现的 display/exposure/duration 关联起来。
    sid: string;
    enterAt: number;
    // 累计“可见”时长（毫秒），随 visibilitychange 暂停/恢复。
    visibleAccum: number;
    visibleStart: number | null;
    lastDwell: number;
    exposed: boolean;
    observer: IntersectionObserver | null;
}

function randomId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * 以“单页会话”为单位管理展现（display）、曝光（exposure）、展现时长（duration）。
 * 面向 SPA：每次进入一个页面即开启一个会话，离开时结算时长。
 */
class PageTracker {
    private current: Session | null = null;
    private listenersBound = false;

    enter(info: PageInfo): void {
        if (typeof window === 'undefined') return;
        this.bindLifecycleListeners();
        // 切页前先补记上一页的最终停留时长。
        this.emitDuration('navigate');
        this.disconnectObserver();

        const now = Date.now();
        this.current = {
            info,
            sid: randomId(),
            enterAt: now,
            visibleAccum: 0,
            visibleStart: this.isVisible() ? now : null,
            lastDwell: -1,
            exposed: false,
            observer: null,
        };
        track('display', info.isArticle ? 'article_view' : 'page_view', this.baseParams());
    }

    // 由框架层在内容挂载后传入内容根节点，用可见性判定“曝光”。
    bindExposure(target: Element | null): void {
        const session = this.current;
        if (!session || session.exposed || !target) return;
        if (typeof IntersectionObserver === 'undefined') {
            // 不支持则退化为“进入即曝光”，保证文章一定有曝光记录。
            this.markExposed(session);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) this.markExposed(session);
            },
            { threshold: 0.01 },
        );
        observer.observe(target);
        session.observer = observer;
    }

    private markExposed(session: Session): void {
        // 防止导航后旧会话的观察者回调误触发。
        if (this.current !== session || session.exposed) return;
        session.exposed = true;
        track(
            'exposure',
            session.info.isArticle ? 'article_exposure' : 'page_exposure',
            this.baseParams(),
        );
        this.disconnectObserver();
    }

    private baseParams(extra?: TrackParams): TrackParams {
        const session = this.current;
        if (!session) return { ...extra };
        return {
            sid: session.sid,
            path: session.info.path,
            title: session.info.title,
            ...session.info.meta,
            ...extra,
        };
    }

    private emitDuration(reason: string): void {
        const session = this.current;
        if (!session) return;
        this.pauseVisible();
        const dwellMs = session.visibleAccum;
        // 仅在可见时长确有增长时上报，避免后台打开、从未可见的页面产生噪声。
        if (dwellMs <= session.lastDwell) {
            this.resumeVisible();
            return;
        }
        session.lastDwell = dwellMs;
        // dwell_ms/stay_ms 为累计值；分析时对同一 sid 取 MAX 即为总时长，
        // 因此 hidden/navigate/pagehide 多次上报不会重复计数。
        track(
            'display',
            session.info.isArticle ? 'article_duration' : 'page_duration',
            this.baseParams({
                dwell_ms: dwellMs,
                stay_ms: Date.now() - session.enterAt,
                reason,
            }),
        );
        // 结算后继续计时，让仍打开的页面能在下一次终态时累加更多可见时长。
        this.resumeVisible();
    }

    private pauseVisible(): void {
        const session = this.current;
        if (!session || session.visibleStart === null) return;
        session.visibleAccum += Date.now() - session.visibleStart;
        session.visibleStart = null;
    }

    private resumeVisible(): void {
        const session = this.current;
        if (!session || session.visibleStart !== null) return;
        if (this.isVisible()) session.visibleStart = Date.now();
    }

    private disconnectObserver(): void {
        const session = this.current;
        if (session?.observer) {
            session.observer.disconnect();
            session.observer = null;
        }
    }

    private isVisible(): boolean {
        return typeof document === 'undefined' || document.visibilityState === 'visible';
    }

    private bindLifecycleListeners(): void {
        if (this.listenersBound || typeof document === 'undefined') return;
        this.listenersBound = true;
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.emitDuration('hidden');
            } else {
                this.resumeVisible();
            }
        });
        // pagehide 是最可靠的终态信号（覆盖关闭标签页与 bfcache）。
        window.addEventListener('pagehide', () => this.emitDuration('pagehide'));
    }
}

export const pageTracker = new PageTracker();
