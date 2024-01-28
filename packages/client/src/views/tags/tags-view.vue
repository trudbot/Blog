<script setup lang="ts">
import WordCloud from '@/components/WordCloud/wordcloud.vue';
import { generate } from 'random-words';
import { inject, onMounted, ref, watch } from 'vue';
import { getAllTags } from '@/apis/tags.api.ts';
import { useRouter } from 'vue-router';

const words = (generate(100) as string[]).map(item => {
  return {
    text: item,
    size: Math.random() * 100,
    info: 'info'
  }
});

const {startLoading, stopLoading} = inject('loading') as any;
const data = ref<{text: string; size: number}[]>([]);
onMounted(() => {
  watch(data, () => {
    startLoading();
  }, {immediate: true});

  getAllTags().then(res => {
    data.value = res.data.map(tag => {
      return {
        text: tag.tag_label,
        size: tag.posts_count * 60
      }
    });
  }).catch(e => {
    console.log(e);
  });
});

const router = useRouter();
function tagClick(d: any) {
  router.push({
    name: 'TagDetail',
    params: {
      tag: d.text
    }
  });
}
</script>

<template>
  <WordCloud
    :data="data"
    @click="tagClick"
    @drawStart="() => {startLoading(); console.log('开始绘制')}"
    @drawEnd="() => {stopLoading(); console.log('绘制结束')}"
  />
</template>

<style scoped>

</style>
