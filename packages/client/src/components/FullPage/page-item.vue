<script setup lang="ts">

</script>

<template>
  <div class="page-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  transition: transform 1s;
}
</style>
