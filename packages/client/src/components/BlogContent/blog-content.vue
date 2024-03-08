<template>
  <div class="hydrogen editor" translate="yes">
    <Viewer :value :plugins="plugins"></Viewer>
  </div>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm';
import 'katex/dist/katex.css';
import math from '@bytemd/plugin-math';
// @ts-ignore
import { Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.css';
import highlight from '@bytemd/plugin-highlight';
import 'highlight.js/styles/github.css';

const plugins = [
  gfm(),
  math(),
  highlight(),
// Add more plugins here
]

const value = defineModel({
  required: true
});
</script>

<!--<style src="../../assets/markdown-themes/smart-blue.scss"/>-->
<!--<style src="../../assets/markdown-themes/mk-cute.scss"/>-->
<style src="../../assets/markdown-themes/hydrogen.scss"/>

<style lang="scss">
@import "../../mixin.scss";

.editor {
  width: 80%;
  margin: 0 auto;
  height: auto;
}

</style>