<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { getPostMetaInfoList } from '@/apis/posts.api.ts';
import BlogItem from './blog-item.vue';
import Carousel from '@/components/Carousel/carousel.vue';
import CarouselItem from '@/components/Carousel/carousel-item.vue';
import { useLocalStorage } from '@vueuse/core';
import { useThemeStore } from '@/stores/theme-store.ts';

const postMeta = ref<PostMetaInfoEntity[]>([]);

// 用户最后一次查看的卡片状态存储

const last = useLocalStorage('last', -1);
const active = ref(0);

const {startLoading, stopLoading} = inject('loading') as any;

onMounted(() => {
    startLoading();
    getPostMetaInfoList().then(res => {
      res.data = res.data.sort((a, b) => {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      })
        postMeta.value = res.data;
        // 用户上一次浏览的文章
        const find = res.data.findIndex(item => item.post_id === last.value);
        active.value = find === -1 ? 0 : find;
        stopLoading();
    }).catch(e => {
      console.log(e);
      stopLoading();
    });
});

function blogActive(index: number) {
    last.value = postMeta.value[index].post_id;
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
        v-for="post in postMeta"
        :key="post.post_id"
        @enter="blogActive"
    >
      <BlogItem :post="post"></BlogItem>
    </CarouselItem>
  </Carousel>
</template>