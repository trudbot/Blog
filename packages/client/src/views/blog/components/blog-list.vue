<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {PostMetaInfoEntity} from "ts-api-models/lib/response";
import {getPostMetaInfoList} from "../../../apis/posts.api.ts";
import {useRouter} from "vue-router";
const router = useRouter();
// router.push({
//   name: "blog-view",
// })
const postMeta = ref<PostMetaInfoEntity[]>([]);
onMounted(() => {
    getPostMetaInfoList().then(res => {
        postMeta.value = res.data;
    });
})
</script>

<template>
    <div class="blog-list">
        <div v-for="item in postMeta" :key="item.post_id" class="post-item">
            <router-link :to="{
              name: 'BlogShow',
              params: {
                id: item.post_id
              }
            }">
              <p class="post-title">{{item.post_title}}</p>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../../mixin";

.blog-list {
  @include fill-up;
  overflow: scroll;
  @include hide-scrollbar;
  width: 80%;
  margin: 0 auto;
  padding-top: 10vh;

  .post-item {
    height: 10vh;

    .post-title {
      font-size: 3rem;
    }
  }
}

</style>