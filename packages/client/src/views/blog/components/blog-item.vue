
<script setup lang="ts">
import {PostMetaInfoEntity} from "ts-api-models/lib/response";
import {dark} from '@/assets/colorSystem.ts'
import {Icon} from '@iconify/vue';
import lodash from "lodash";
import {useI18n} from "vue-i18n";
import { inject } from "vue";

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
          <li
              v-for="(tag, i) in post.tags"
              :style="{color: colors[i % colors.length]}"
              class="link"
          >{{tag.tag_label}}</li>
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

.blog-item {
    color: #000;
    padding-top: 20px;
    .post-title {
        display: flex;
        justify-content: center;
        width: 90%;
        margin: 0 auto;
    }
    .title-text {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: var(--font-color);
        font-size: 1.5rem;
        font-family: 'Noto Serif SC', serif;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 5px;
      font-size: 1.5rem;

      li {
        margin-left: 0.5rem;
      }
    }
    .publish {
      @include flex-center;
      font-size: .8rem;
      font-family: monospace;
      margin-top: 10px;

      .text {
        margin-left: 5px;
      }
    }
}

.link {
  position: relative;
  $bar-height: 1px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(100% - $bar-height);
    transform: scaleX(0);
    background-color: #000;
    height: $bar-height;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
}
</style>