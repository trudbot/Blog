<script setup lang="ts">
import Masonry from '@/components/Masonry/masonry.vue';
import pics from '@/assets/pic/trudbot.ts';
</script>

<template>
  <masonry :columns="3" :pics="pics"/>
</template>