<script setup lang="ts">
import { TagEntity } from 'ts-api-models/lib/response/tag';
import WordCloud from '@/components/WordCloud/wordcloud.vue';
import { generate } from 'random-words';
import { inject, onMounted, ref } from 'vue';

const words = (generate(100) as string[]).map(item => {
  return {
    text: item,
    size: Math.random() * 100,
    info: 'info'
  }
});

const {startLoading, stopLoading} = inject('loading') as any;
const data = ref<TagEntity[]>([]);
onMounted(() => {
  startLoading();
});
</script>

<template>
  <WordCloud
    :data="words"
    @click="d => {console.log(d, '被点击')}"
    @drawStart="() => {startLoading(); console.log('开始绘制')}"
    @drawEnd="() => {stopLoading(); console.log('绘制结束')}"
  />
</template>

<style scoped>

</style>
