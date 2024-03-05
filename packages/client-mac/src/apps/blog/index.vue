<template>
  <draggable-app
    app-name="blog"
    :width="800"
    :height="600"
    :docker-info="{
      system: false,
      icon: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/56c70c6d-4a78-47a4-afa0-855b60caa015.jpeg',
      name: 'blog'
    }"
  >
    <template #content>
      <iframe 
        height="100%"
        width="100%"
        src="https://beta.trudbot.cn/"
      />
    </template>
  </draggable-app>
</template>

<script lang="ts" setup>
import DraggableApp from '@/components/DraggableApp/draggable-app.vue';
</script>

<style lang="scss" scoped>

</style>