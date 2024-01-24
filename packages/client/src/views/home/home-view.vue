<script setup lang="ts">
import FullPage from '../../components/FullPage/index.vue'
import PageItem from "../../components/FullPage/page-item.vue";
import {useThemeStore} from "../../stores/theme-store";
import device from 'current-device'
import codeStr from "./code.ts";
import {useI18n} from "vue-i18n";
import techStack from "./tech-stack.ts";
import {openLink} from "../../utils/openLink.ts";
import TimeLine from "../../components/TimeLine/time-line.vue";
import {useCodingSimulator} from "./codingSimulator.ts";

const {t} = useI18n();
const {isDark} = useThemeStore();

const {code, disable} = useCodingSimulator(codeStr, 500);

</script>

<template>
  <div class="home-container">
    <FullPage>
      <PageItem class="avatar">
        <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311131854196.webp" alt="">
        <p>trudbot</p>
      </PageItem>
      <PageItem>
        <div class="frontend">
          <div class="title">
            {{t('home.frontend')}}
          </div>
          <div class="stack-container">
            <div class="stack">
              <img v-for="tech in techStack" :src="tech.img" :alt="tech.name" :key="tech.name" @click="openLink(tech.url)"/>
            </div>
          </div>
        </div>
      </PageItem>
      <PageItem>
        <div class="acm-show">
          <div class="title">
            {{ t('home.cp') }}
          </div>
          <div class="cp-content">
            <div class="cp-item icpc-icon">
              <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202311181422543.png"
                   alt="icpc" :style="{width: device.mobile() ? '80vw' : ''}">
            </div>
            <div class="code-box cp-item" v-if="device.desktop()">

            </div>
          </div>
        </div>
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
      @include cycle(min(30vw, 30vh));
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
        @include square(10vw);
        @include hover-cursor(pointer);
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
      font-size: max(3vw, 30px);
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
          top: 30%;
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
