<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { setRotateAnimation } from '@/components/RoundCarousel/setRotateAnimation.ts';

const props = withDefaults(defineProps<{
  L: number;
  pics: string[];
}>(), {
  L: 300,
  pics: () => []
});

const cycleRef = ref<Element>();
let animation: Animation | null = null;
const duration = 2000;

// 设置大圆转动动画
watchEffect(() => {
  if (cycleRef.value && props.pics.length) {
    try {
      animation && animation.cancel();
      animation = setRotateAnimation(
        props.pics.length,
        duration,
        cycleRef.value
      ).animation;
    } catch (e) {
      console.log(e);
    }
  }
});
</script>

<template>
  <div
    class="carousel"
    :style="{
      '--r': L + 'px',
      '--N': pics.length
    }
">
    <ul class="cycle" ref="cycleRef">
      <li
        class="carousel-item"
        v-for="(url, index) in pics"
        :style="{
          // 设置旋转角度， 使图片均匀的分布在圆上
          transform: `rotate(${index * 360 / pics.length}deg)`
        }"
      >
        <!-- item内容， 将来可以做成插槽 -->
        <img :src="url" alt="pic" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/mixin";
.carousel {
  // item和可视区域的半径
  --r: 0px;
  --N: 1;
  @include cycle(calc(2 * var(--r)));
  position: relative;
  overflow: hidden;

  .cycle {
    // 大圆的半圆， item分布在大圆上
    --deg: calc(360deg / var(--N));
    --R: calc(var(--r) / sin(var(--deg) / 2));
    position: absolute;
    top: 50%;
    left: calc(50% - var(--R));
    @include cycle(calc(2 * var(--R)));

    .carousel-item {
      @include cycle(calc(2 * var(--r)));
      position: absolute;
      overflow: hidden;
      
      // item定位至与可视区域重合
      top: calc(-1 * var(--r));
      left: calc(50% - var(--r));
      transform-origin: center calc(var(--r) + var(--R));
    }
  }
}
</style>