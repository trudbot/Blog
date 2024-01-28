<script lang="ts" setup>
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { inject, onMounted, ref } from 'vue';
import { getPostMetaInfoList } from '@/apis/posts.api.ts';
import BlogList from '@/components/BlogList/blog-list.vue';

const postMeta = ref<PostMetaInfoEntity[]>([]);
const {startLoading, stopLoading} = inject('loading') as any;
onMounted(() => {
   startLoading();
   getPostMetaInfoList().then(res => {
     res.data = res.data.sort((a, b) => {
       return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
     })
     postMeta.value = res.data;
     stopLoading();
   }).catch(e => {
     console.log(e);
     stopLoading();
   });
});


</script>

<template>
  <BlogList origin="blog" :meta="postMeta"/>
</template>