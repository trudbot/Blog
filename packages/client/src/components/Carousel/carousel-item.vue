<script setup lang="ts">

import {useCarouselItem} from "@/components/Carousel/useCarouselItem.ts";
import {computed, ComputedRef, CSSProperties, inject, onMounted} from "vue";
import {ClampType, StyleProps} from "@/components/Carousel/interface.ts";


defineOptions({
  name: 'CarouselItem'
})

/*-------------------
由用户定义卡片宽高
 --------------------*/

const props = defineProps<StyleProps>();

const cardStyle = inject<ComputedRef<StyleProps>>('cardStyle');
onMounted(() => {
  console.log(cardStyle);
});

function clamp(range: ClampType) {
  return `clamp(${range.min}, ${range.value}, ${range.max})`;
}

const width = computed(() => {
  return clamp(
      props.width ||
      cardStyle?.value?.width ||
      {
        min: '150px',
        max: '30vw',
        value: '300px'
      }
  );
});
const height = computed(() => {
  return clamp(
      props.height ||
      cardStyle?.value?.height ||
      {
        min: '200px',
        max: '40vw',
        value: '400px'
      }
  )
});


/*-------------------
  卡片transform绑定
 -------------------*/
const {
    offset,
    zIndex,
    index,
    setActive
} = useCarouselItem();

const style = computed<CSSProperties>(() => {
  const _x = offset.value * 80 - 50 + '%';
  const _y = offset.value * 20 - 50 + '%';
  const _rot = offset.value * 12 + 'deg';
  const boxShadow = props.boxShadow || cardStyle?.value?.boxShadow || `0 10px 50px 10px rgba(0, 0, 0, .5)`;
  return {
    zIndex: zIndex.value,
    transform: `translate(${_x}, ${_y}) rotate(${_rot})`,
    width: width.value,
    height: height.value,
    boxShadow: boxShadow
  }
})
/* ------------------
  回调
 -------------------*/

const emit = defineEmits<{
  (e: 'enter', index: number): void;
}>();

function click() {
  emit('enter', index.value);
  setActive(index.value);
}
</script>

<template>
  <div class="carousel-item" @click="click" :style="style">
    <slot></slot>
  </div>
</template>

<style scoped>
.carousel-item {
  overflow: hidden;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  user-select: none;
  transform-origin: 0 100%;
  box-shadow: 0 10px 50px 10px rgba(0, 0, 0, .5);
  transition: transform .8s cubic-bezier(0, 0.02, 0, 1);
}
</style>