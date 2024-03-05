import { getCurrentInstance, inject, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { DockerContext } from './constants.ts';

export const useDockerItem = (
itemRef: Ref<HTMLElement | undefined>
) => {
  const instance = getCurrentInstance();
  const context = inject(DockerContext);
  if (!context || !instance) {
    throw new Error('useDockerItem must be used within a Docker');
  }
  const {addItem, removeItem} = context;
  let left: number, right: number;
  const ratio = ref(1);

  function setRatio(f: (l: number, r: number) => number) {
    ratio.value = f(left, right);
    return ratio.value;
  }

  onMounted(() => {
    // 已知item的比例是通过计算三角函数的定积分(面积)得到的， 所以item的宽度会影响计算结果
    // 由于item的宽度是变化的， 所以往往导致 item比较靠近鼠标 -> item宽度变大 -> item宽度变得更大
    // 所以只用item的初始位置
    if (itemRef.value) {
      const rect = itemRef.value.getBoundingClientRect();
      left = rect.left;
      right = left + rect.width;
    }
    addItem({
      uid: instance.uid,
      setRatio,
    });
  })

  onUnmounted(() => {
    removeItem(instance.uid);
  });

  return {ratio}
}