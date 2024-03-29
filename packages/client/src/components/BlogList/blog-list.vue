<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import BlogItem from '@/components/BlogItem/blog-item.vue';
import Carousel from '@/components/Carousel/carousel.vue';
import CarouselItem from '@/components/Carousel/carousel-item.vue';
import { useLocalStorage } from '@vueuse/core';
import { useThemeStore } from '@/stores/theme-store.ts';

const props = withDefaults(defineProps<{
  origin: string;
  meta: PostMetaInfoEntity[];
}>(), {
  origin: 'blog',
  meta: () => []
});

// 用户最后一次查看的卡片状态存储
const last = useLocalStorage(`last-${props.origin}`, -1);
const active = ref(0);

watch([() => props.meta], () => {
  // 定位到用户上一次浏览的文章
  const find = props.meta.findIndex(item => item.post_id === last.value);
  active.value = find === -1 ? 0 : find;
}, {immediate: true});

function blogActive(index: number) {
  last.value = props.meta[index].post_id;
}

const {isDark} = useThemeStore();
const cardStyle = computed(() => {
  return {
    width: {
      min: '150px',
      max: '30vw',
      value: '400px'
    },
    height: {
      min: '200px',
      max: '40vw',
      value: '500px'
    },
    boxShadow: isDark() ? "0 10px 50px 10px rgba(255, 255, 255, .5)" : "0 10px 50px 10px rgba(0, 0, 0, .5)"
  }
})

</script>

<template>
  <Carousel
    v-model="active"
    :card-style="cardStyle"
  >
    <CarouselItem
      v-for="(post, idx) in meta"
      :key="post.post_id"
      @enter="blogActive"
      class="not-allow__wrapper"
    >
      <BlogItem :post="post" :class="active === idx ? '' : 'not-allow'"/>
    </CarouselItem>
  </Carousel>
</template>

<style scoped lang="scss">
.not-allow {
  pointer-events: none;
}
</style>