<script setup lang="ts">
import Carousel from '@/components/RoundCarousel/carousel.vue';
import pics from '@/assets/pic/trudbot-3d.ts';
</script>

<template>
  <section>
    <Carousel :L="150" :pics="pics.map(pic => pic.url)" class="carousel"/>
  </section>
</template>

<style scoped lang="scss">
@import "@/mixin.scss";
section {
  @include fill-up;
  @include flex-center;
}
</style>
