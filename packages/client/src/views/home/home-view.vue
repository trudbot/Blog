<script setup lang="ts">
import FullPage from '@/components/FullPage/index.vue';
import PageItem from '@/components/FullPage/page-item.vue';
import device from 'current-device';
import { useI18n } from 'vue-i18n';
import techStack from './tech-stack.ts';
import { openLink } from '@/utils/openLink.ts';
import TimeLine from '@/components/TimeLine/time-line.vue';

const {t} = useI18n();
</script>

<template>
  <div class="home-container">
    <FullPage>
      <PageItem class="avatar">
        <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311131854196.webp" alt="">
        <p>trudbot</p>
      </PageItem>
      <PageItem>
        <section class="frontend">
          <div class="title">
            {{t('home.frontend')}}
          </div>
          <div class="stack-container">
            <div class="stack">
              <img v-for="tech in techStack" :src="tech.img" :alt="tech.name" :key="tech.name" @click="openLink(tech.url)"/>
            </div>
          </div>
        </section>
      </PageItem>
      <PageItem>
        <section class="acm-show">
          <div class="title">
            {{ t('home.cp') }}
          </div>
          <div class="cp-content">
            <div class="cp-item icpc-icon">
              <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311181422543.png"
                   alt="icpc" :style="{width: device.mobile() ? '80vw' : ''}">
            </div>
          </div>
        </section>
      </PageItem>
      <PageItem>
        <TimeLine></TimeLine>
      </PageItem>
    </FullPage>
  </div>
</template>

<style scoped lang="scss">
@import "../../mixin.scss";

.home-container {
  box-sizing: border-box;
  @include fill-up;
  overflow: hidden;
  @include hover-cursor(ns-resize);

  .avatar {
    @include flex-center;
    flex-direction: column;

    img {
      @include cycle(min(60vw, 30vh));
    }

    p {
      margin-top: 20px;
      font-size: max(3vh, 3vw);
    }
  }

  .frontend {
    display: flex;
    flex-direction: column;

    .stack-container {
      flex: 1;
      @include flex-center;
    }

    .stack {
      width: 50vw;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      img {
        @include square(max(10vw, 10vh));
        @include hover-cursor(pointer);
        margin-left: 10px;
      }
    }
  }


  .acm-show, .frontend {
    @include fill-up;
    display: flex;
    flex-direction: column;

    .title {
      font-family: inherit;
      @include flex-center;
      font-size: max(3vw, 2rem);
      margin-top: 1vh;
      margin-bottom: 1vh;
      height: 10vh;
    }

    .cp-content {
      flex: 1;
      display: flex;

      .cp-item {
        height: 100%;
        flex: 1;

        img {
          position: relative;
          object-fit: contain;
        }

        &.icpc-icon {
          text-align: center;
        }
      }
    }
  }
}
</style>
