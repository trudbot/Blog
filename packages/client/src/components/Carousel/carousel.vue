<script setup lang="ts">
import {useCarousel} from "@/components/Carousel/useCarousel.ts";
import {StyleProps} from "@/components/Carousel/interface.ts";
import {computed, provide} from "vue";

export interface Props {
  height?: string;
  initialActiveIndex?: number;
  cardStyle?: StyleProps;
}

const props = withDefaults(defineProps<Props>(), {
  height: "100%",
  cardStyle: () => ({
    width: {
      min: '150px',
      max: '30vw',
      value: '300px'
    },
    height: {
      min: '200px',
      max: '40vw',
      value: '400px'
    },
    boxShadow: "0 10px 50px 10px rgba(0, 0, 0, .5)"
  })
});

const cardStyle = computed(() => props.cardStyle);
provide('cardStyle', cardStyle);

const active = defineModel<number>({
  default: 0
});

useCarousel(props.initialActiveIndex, active);
</script>

<template>
  <div class="carousel">
    <slot></slot>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  z-index: 1;
  height: v-bind(height);
  overflow: hidden;
}
</style>