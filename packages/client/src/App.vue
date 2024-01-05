<script setup lang="ts">
import Navigation from "./components/navigation.vue";
import {useThemeStore} from "./stores/theme-store.ts";
import {useLanguageStore} from "./stores/language-store.ts";
import {useRouter} from "vue-router";
import {nextTick, onMounted, watch} from "vue";
const router = useRouter();
const {isDark} = useThemeStore();
useLanguageStore();

onMounted(() => {
  if (isDark()) {
    document.documentElement.classList.add('dark-mode');
  }
})

watch(isDark, async () => {
  await nextTick()
  document.documentElement.classList.toggle('dark-mode')
})

</script>

<template>
  <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311122207869.webp" alt="home" @click="router.push('/')">
  <div class="app-container">
    <header class="nav-container">
      <navigation />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
@import "./mixin.scss";

img {
  @include cycle(min(145px, max(10vw, 96px)));
  position: absolute;
  top: 2vh;
  left: 0.5vw;
  z-index: 999;
  cursor: pointer;
}

.app-container {
  transition: background-color 2s;
  background: var(--color);
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    box-sizing: border-box;
    padding-top: 20px;
    height: 100%;
    flex: 1;
    overflow: hidden;
  }

  .nav-container {
    padding-left: 10vw;
    padding-top: 15px;
  }
}

</style>
