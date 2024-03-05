<script setup lang="ts">
import DraggableApp from './components/DraggableApp/draggable-app.vue';
import DraggableGroup from './components/DraggableApp/draggable-group.vue';
import Trudbot from './apps/trudbot/index.vue'
import Blog from './apps/blog/index.vue'
</script>

<template>
  <draggable-group group-name="test">
    <blog/>
    <trudbot/>
    <draggable-app
      app-name="app2"
      :docker-info="{
        system: false,
        icon: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/79ce82bdffb3d1ef9409ab47f08a6312.jpg',
        name: 'app2'
      }"
    >
      <template #title>
        <span class="title">app2</span>
      </template>
    </draggable-app>
    <draggable-app
      app-name="app3"
      :docker-info="{
        system: false,
        icon: 'https://trudbot-pic.oss-cn-hangzhou.aliyuncs.com/trubdot/Trudbot%20on%20instagram.jpeg',
        name: 'app3'
      }"
    >
      <template #title>
        <span class="title">app3</span>
      </template>
    </draggable-app>
  </draggable-group>
</template>

<style scoped>
.title {
  color: #000;
  width: 100%;
  display: block;
  font-size: 1.2rem;
  text-align: center;
}
</style>
