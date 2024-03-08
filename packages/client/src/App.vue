<script setup lang="ts">
import Navigation from './components/Navigation/navigation.vue';
import { useThemeStore } from './stores/theme-store.ts';
import { useLanguageStore } from './stores/language-store.ts';
import { useRouter } from 'vue-router';
import { nextTick, onMounted, provide, watch } from 'vue';
import Loading from '@/components/Loading/loading.vue';
import { useLoading } from '@/hooks/useLoading';
import { useOption } from '@/hooks/useOption.ts';

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

// 允许一级子组件调整app的布局
// 默认为full page, nav固定高度, content占满窗口剩余高度
// 为content布局时, nav固定高度, content高度auto, container滚动
const [
  layout,
  setFullPageLayout,
  setContentLayout
] = useOption(['fullPage', 'content'], 'fullPage');
provide('layout', {
  layout,
  setFullPageLayout,
  setContentLayout
});

</script>

<template>
  <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311122207869.webp" alt="home" @click="router.push('/')">
  <div :class="['app-container', layout]">
    <header class="nav-container">
      <navigation />
    </header>
    <main class="app-content">
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

  .app-content {
    box-sizing: border-box;
    padding-top: 20px;
  }

  .nav-container {
    padding-left: 10vw;
    padding-top: 15px;
  }
}

.app-container.fullPage {
  display: flex;
  flex-direction: column;

  .app-content {
    flex: 1;
    overflow: hidden;
  }
}

.app-container.content {
  overflow-y: scroll;
  @include hide-scrollbar;
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
