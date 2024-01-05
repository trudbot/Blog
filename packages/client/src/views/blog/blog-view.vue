<script setup lang="ts">

import BlogContent from "../../components/BlogContent/blog-content.vue";
</script>

<template>
  <div class="blog-box">
    <blog-content></blog-content>
  </div>
</template>

<style scoped lang="scss">
@import "../../mixin.scss";

.blog-box {
  @include fill-up;
  overflow: scroll;
  @include hide-scrollbar;
}
</style>
