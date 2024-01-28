<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { getPostMetaInfoList } from '@/apis/posts.api.ts';
import BlogList from '@/components/BlogList/blog-list.vue';

const props = defineProps<{
  tag: string;
}>();
const meta = ref<PostMetaInfoEntity[]>([]);
const {startLoading, stopLoading} = inject('loading') as any;
onMounted(() => {
  startLoading();
  getPostMetaInfoList({tag_label: props.tag}).then(res => {
    res.data = res.data.sort((a, b) => {
      return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
    });
    meta.value = res.data;
    stopLoading();
  }).catch(e => {
    console.log(e);
    stopLoading();
  });
})
</script>

<template>
  <div class="tag-detail-container">
    <h1 class="tag">{{tag}}</h1>
    <div class="tag-blogs">
      <BlogList origin="tag" :meta="meta"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-detail-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tag {
    text-align: center;
  }
  .tag-blogs {
    flex: 1;
  }
}
</style>