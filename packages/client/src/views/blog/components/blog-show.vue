<script lang="ts" setup>
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <p>post: {{id}}</p>
</template>