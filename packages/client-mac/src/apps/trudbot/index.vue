<script setup lang="ts">
import DraggableApp from '@/components/DraggableApp/draggable-app.vue';
import Masonry from '@/components/Masonry/masonry.vue';
import pics from '@/assets/pic/trudbot.ts';
</script>

<template>
  <draggable-app
    app-name="trudbot"
    :width="800"
    :height="400"
    :docker-info="{
      system: false,
      icon: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/56c70c6d-4a78-47a4-afa0-855b60caa015.jpeg',
      name: 'trudbot'
    }"
  >
    <template #content>
      <masonry :columns="3" :pics="pics"/>
    </template>
  </draggable-app>
</template>

<style scoped lang="scss">

</style>
