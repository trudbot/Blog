
<script setup lang="ts">
import { PostMetaInfoEntity } from 'ts-api-models/lib/response';
import { dark } from '@/assets/colorSystem.ts';
import { Icon } from '@iconify/vue';
import lodash from 'lodash';
import { useI18n } from 'vue-i18n';
import { inject } from 'vue';

defineProps<{
  post: PostMetaInfoEntity
}>();

const colors = lodash.shuffle(dark);

const {t} = useI18n();

const {startLoading} = inject('loading') as any;
</script>

<template>
    <div class="wrapper">
      <article class="blog-item">
        <div class="post-title">
          <router-link
              class="title-text link"
              :to="{
                name: 'BlogShow',
                params: {
                  id: post.post_id
                }
              }"
              @click="startLoading()"
          >{{ post.post_title }}</router-link>
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
      </article>
    </div>
</template>

<style lang="scss" scoped>
@import "@/mixin.scss";
.wrapper {
    @include fill-up;
    background: white;
    position: relative;
    display: block;
}
</style>

<style lang="scss" scoped src="./blog-item.scss"/>