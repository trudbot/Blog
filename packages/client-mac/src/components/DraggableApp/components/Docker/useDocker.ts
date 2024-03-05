import { getCurrentInstance, onMounted, provide, ref, Ref } from 'vue';
import { useOrderedChildren } from '@/hooks/useOrderedChildren.ts';
import { DockerContext, DockerItemContext } from './constants.ts';
import {config} from './config.ts';
/*
函数为 y = delta * cos(PI * (x - centerX) / diameter)
不定积分为 Y = delta * diameter * sin(PI * (x - centerX) / diameter) / PI
 */
function getCalculator(
  {
    centerX = 0,
    delta = 0.01,
    diameter = 200,
  }: {
    centerX: number,
    // 三角函数的最高点
    delta?: number,
    // 直径
    diameter?: number,
    freq?: number
  }
) {
  const integration = (x: number) => {
    return delta * diameter * Math.sin(Math.PI * (x - centerX) / diameter) / Math.PI;
  }

  return (left: number, right: number) => {
    left = Math.max(centerX - diameter / 2, left);
    right = Math.min(centerX + diameter / 2, right);
    if (left > right) return 1;
    return integration(right) - integration(left) + 1;
  }
}

export const useDocker = (
dockerRef: Ref<HTMLElement | undefined>,
) => {
  const instance = getCurrentInstance();
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<DockerItemContext>(instance!, 'DockerItem');

  /**
   * 
   * @param {MouseEvent} e 鼠标在docker上移动的事件
   * @description 根据鼠标x坐标, 生成计算函数, 并根据计算函数设置每个item的放大比例
   */
  function calcRatio(e: MouseEvent) {
    const { clientX: x } = e;
    const calc = getCalculator({
      centerX: x,
      delta: config.delta,
      diameter: config.diameter,
    });
    items.value.forEach(item => {
      item.setRatio(calc);
    });
  }

  function listenMouseLeave(e: MouseEvent) {
    const {clientY: mouseY} = e;
    const boxY = dockerRef.value?.getBoundingClientRect().top;
    // 由于dockerItem被放大， 所以鼠标离开docker时， 鼠标的y坐标还是比dockerItem的y大
    // 所以鼠标从docker上方离开docker至少50px时， 才会还原dockerItem的比例
    if (boxY === undefined || mouseY <= boxY - 50) {
      items.value.forEach(item => {
        item.setRatio(() => 1);
      });
      document.removeEventListener('mousemove', calcRatio);
      document.removeEventListener('mousemove', listenMouseLeave);
    }
  }

  onMounted(() => {
    if (dockerRef.value) {
      dockerRef.value.addEventListener('mouseenter', () => {
        document.addEventListener('mousemove', calcRatio);
        document.addEventListener('mousemove', listenMouseLeave);
      })
    }
  })

  provide(DockerContext, {
    addItem,
    removeItem,
  })
}