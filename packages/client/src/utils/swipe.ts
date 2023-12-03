// 滑动方向的枚举
enum ScrollDirection {
    Up = 'up',
    Down = 'down',
}

type ScrollCallback = (direction: ScrollDirection) => void;

function addSwipeListener(targetElement: HTMLElement | Window = window, callback: ScrollCallback): void {
    let startY: number | null = 0;

    targetElement.addEventListener('touchstart', function (event: TouchEvent)  {
        startY = event.touches[0].clientY;
    });

    targetElement.addEventListener('touchmove', function (event: TouchEvent)  {
        if (!startY) {
            return;
        }
        const endY = event.touches[0].clientY;
        const deltaY = endY - startY;
        startY = null;
        if (deltaY > 50) {
            callback(ScrollDirection.Down);
        } else if (deltaY < -50) {
            callback(ScrollDirection.Up);
        }
    });
}

export {ScrollDirection, ScrollCallback, addSwipeListener}
