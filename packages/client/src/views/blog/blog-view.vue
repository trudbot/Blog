<script setup lang="ts">

// import BlogContent from "../../components/BlogContent/blog-content.vue";
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss">
@import "../../mixin.scss";

.blog-box {
  @include fill-up;
  overflow: scroll;
  @include hide-scrollbar;
}
</style>
