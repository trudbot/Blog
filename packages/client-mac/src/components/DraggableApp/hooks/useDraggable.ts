import { onMounted, onUnmounted, Ref, watchEffect } from 'vue';

export const useDraggable = (
  sourceRef: Ref<HTMLElement | undefined>,
  targetRef: Ref<HTMLElement | undefined>,
  leftChangeCallback?: (left: string) => void,
  topChangeCallback?: (top: string) => void,
  dragStopCallback?: (left: string, top: string) => void
) => {
  let source: HTMLElement;
  let target: HTMLElement;
  let dragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  watchEffect(() => {
    if (sourceRef.value) {
      source = sourceRef.value;
      source.addEventListener('mousedown', dragMouseDown);
    }
    if (targetRef.value) {
      target = targetRef.value;
    }
  });

  function dragMouseDown(e: MouseEvent) {
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    document.addEventListener('mousemove', dragMouseMove);
    document.addEventListener('mouseup', dragMouseUp);
  }

  function dragMouseMove(e: MouseEvent) {
    if (e.buttons !== 1) {
      dragMouseUp();
      return;
    }
    if (dragging) {
      const offsetX = e.clientX - dragStartX;
      const offsetY = e.clientY - dragStartY;
      target.style.left = `${target.offsetLeft + offsetX}px`;
      // 由于移动app需要top bar的鼠标交互， 所以top不能小于0
      target.style.top = `${Math.max(0, target.offsetTop + offsetY)}px`;
      leftChangeCallback && leftChangeCallback(target.style.left);
      topChangeCallback && topChangeCallback(target.style.top);
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    }
  }

  function dragMouseUp() {
    dragging = false;
    dragStopCallback && dragStopCallback(target.style.left, target.style.top);
    document.removeEventListener('mousemove', dragMouseMove);
    document.removeEventListener('mouseup', dragMouseUp);

  }

  onUnmounted(() => {
    document.removeEventListener('mousemove', dragMouseMove);
    document.removeEventListener('mouseup', dragMouseUp);
  })
}