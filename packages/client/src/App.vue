<script setup lang="ts">
import Navigation from './components/Navigation/navigation.vue';
import { useThemeStore } from './stores/theme-store.ts';
import { useLanguageStore } from './stores/language-store.ts';
import { useRouter } from 'vue-router';
import { nextTick, onMounted, provide, watch } from 'vue';
import Loading from '@/components/Loading/loading.vue';
import { useLoading } from '@/hooks/useLoading';

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

// loading 状态控制
const {loading, startLoading, stopLoading} = useLoading(false);
provide('loading', {
  loading,
  startLoading,
  stopLoading
});
</script>

<template>
  <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311122207869.webp" alt="home" @click="router.push('/')">
  <div class="app-container">
    <header class="nav-container">
      <navigation />
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <Transition name="content">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <loading v-model="loading"/>
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
  background: transparent;
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


.content-enter-from {
  transform: translateY(-100%);
}

//.content-leave-to {
//  transform: translateY(100%);
//}

.content-enter-active {
  transition: transform 0.5s linear;
}
</style>
