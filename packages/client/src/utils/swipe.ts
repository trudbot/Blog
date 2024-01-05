// 滑动方向的枚举
enum ScrollDirection {
    Up = 'up',
    Down = 'down',
}

type ScrollCallback = (direction: ScrollDirection, event: TouchEvent) => void;
type TouchCallback = (event: TouchEvent) => void;
interface SwipeOptions {
    deltaLimit?: number;
    touchStartCallback?: TouchCallback;
    touchEndCallback?: TouchCallback;
}

const defaultDeltaLimit = 5;

function addSwipeListener(
    targetElement: HTMLElement,
    touchMoveCallback: ScrollCallback,
    {
        deltaLimit,
        touchStartCallback,
        touchEndCallback,
    }: SwipeOptions = {
        deltaLimit: defaultDeltaLimit,
    },
): void {
    let startY: number | null = 0;

    targetElement.addEventListener('touchstart', (event: TouchEvent) =>  {
        startY = event.touches[0].clientY;
        touchStartCallback && touchStartCallback(event);
    });

    targetElement.addEventListener('touchmove',  (event: TouchEvent) => {
        if (!startY) {
            return;
        }
        const endY = event.touches[0].clientY;
        const deltaY = endY - startY;
        startY = null;
        if (deltaY > (deltaLimit || defaultDeltaLimit)) {
            touchMoveCallback(ScrollDirection.Down, event);
            console.log('callback')
        } else if (deltaY < -(deltaLimit || defaultDeltaLimit)) {
            touchMoveCallback(ScrollDirection.Up, event);
            console.log('callback')
        }
    });

    touchEndCallback && targetElement.addEventListener('touchend', touchEndCallback);
}

export {ScrollDirection, addSwipeListener}
