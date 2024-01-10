<template>
  <component :is="templates[lodash.random(0, templates.length - 1)]"></component>
<!--  <grimace></grimace>-->
<!--  <train></train>-->
<!--  <lantern></lantern>-->
</template>

<script setup lang="ts">
import lantern from "./templates/lantern.vue";
import train from "./templates/train.vue";
import hits from "./templates/hits.vue";
import grimace from './templates/grimace.vue';
import lodash from "lodash";

const templates = [
  train,
  hits,
  grimace,
  lantern
];


</script>