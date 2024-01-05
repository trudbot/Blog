export function isScrolledToTop(el: Element) {
    return el.scrollTop === 0;
}

export function isScrolledToBottom(el: Element) {
    return Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1;
}