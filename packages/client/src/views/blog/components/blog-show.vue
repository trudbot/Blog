<script lang="ts" setup>
import { onMounted, ref } from "vue";
import BlogContent from "../../../components/BlogContent/blog-content.vue";
import { PostEntity } from "ts-api-models/lib/response";
import { getPostById } from "../../../apis/posts.api.ts";
const props = defineProps<{
  id: string | number;
}>();
const post = ref<PostEntity>({
  post_title: '',
  post_content: '',
  post_id: 0,
  publish_date: new Date(),
  tags: [],
  category: []
});
onMounted(() => {
  getPostById({id: props.id as number}).then(res => {
    post.value = res.data;
  })
})
</script>

<template>
  <div class="blog-show">
    <blog-content v-model="post.post_content"></blog-content>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../mixin";
.blog-show {
  @include fill-up;
  overflow: scroll;
  @include hide-scrollbar;
}
</style>