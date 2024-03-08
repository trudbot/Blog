<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from 'vue';
import BlogContent from '@/components/BlogContent/blog-content.vue';
import { PostEntity } from 'ts-api-models/lib/response';
import { getPostById } from '@/apis/posts.api.ts';
import { useRouter } from 'vue-router';
import { dark } from '@/assets/colorSystem.ts';
import lodash from 'lodash';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

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

const {t} = useI18n();
const router = useRouter();
const {startLoading, stopLoading} = inject('loading') as any;
const {setContentLayout, setFullPageLayout} = inject('layout') as any;

onMounted(() => {
  setContentLayout();
  stopLoading();
  startLoading();
  getPostById({id: props.id as number}).then(res => {
    post.value = res.data;
    stopLoading();
  }).catch(err => {
    console.log(err);
    stopLoading();
    router.push({
      name: '404'
    })
  })
})

onUnmounted(() => {
  setFullPageLayout();
})

const colors = lodash.shuffle(dark);
</script>

<template>
  <div class="blog-show">
    <header class="blog-item">
      <div class="post-title">
        <p class="title-text link">{{ post.post_title }}</p>
      </div>
      <ul class="tag-list">
        <Icon icon="solar:tag-line-duotone"></Icon>
        <router-link
          v-for="(tag, i) in post.tags"
          :style="{color: colors[i % colors.length]}"
          :to="{
                name: 'TagDetail',
                params: {
                  tag: tag.tag_label
                }
              }"
          class="link tag"
        >{{tag.tag_label}}</router-link>
      </ul>
      <div class="publish">
        <Icon icon="formkit:date"></Icon>
        <span class="text">
            {{t('blog.published') + ' '}}
            {{new Date(post.publish_date).toLocaleDateString()}}
          </span>
      </div>
    </header>
    <blog-content v-model="post.post_content"></blog-content>
  </div>
</template>
<style lang="scss" scoped src="@/components/BlogItem/blog-item.scss" />
<style lang="scss" scoped>
@import "@/mixin";
.blog-show {
  .blog-item {
    color: var(--blog-header-font-color);

    .title-text {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
</style>