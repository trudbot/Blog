<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {useThemeStore} from "../stores/theme-store";
import {useI18n} from "vue-i18n";
import {useLanguageStore} from "../stores/language-store";
import {computed} from "vue";
import {useRouter} from "vue-router";
import lodash from 'lodash';
import device from "current-device";
const { throttle } = lodash;

const {isDark, switchTheme} = useThemeStore();
const {locale, t} = useI18n();
const {changeLanguage} = useLanguageStore();
const router = useRouter();

const socialLink = [
  {title: "github", link: "https://github.com/trudbot", icon: "line-md:github-loop"},
  {title: "qq", link: "https://qm.qq.com/cgi-bin/qm/qr?k=MH-43mhUJOJb83xmB28ZHUW4-D2FRsjF", icon: "la:qq"},
  {title: "zhihu", link: "https://www.zhihu.com/people/qu-ge-sha-ming-hao-ni-30", icon: "ant-design:zhihu-outlined"}
];

const menuItems = computed(() => {
  return [
    {label: t('menus.blog'), route: '/blog'},
    {label: t('menus.tags'), route: '/tags'},
    {label: t('menus.categories'), route: '/categories'},
    {label: t('menus.archives'), route: '/archives'},
    {label: t('menus.idols'), route: '/idols'},
    {label: t('menus.friends'), route: '/friends'}
  ]
})

const switchThemeThrottling = throttle(switchTheme, 1500, {
  leading: true,
  trailing: false
});

const changeLanguageThrottling = throttle(changeLanguage, 1000, {
  leading: true,
  trailing: false
});

</script>

<template>
  <nav>

    <!-- 菜单栏， 当设备为桌面时显示 -->
    <div class="menu">
      <template v-if="!device.mobile()">
        <a class="nav-item text-box" v-for="item in menuItems" :key="item.route" @click="router.push(item.route)">
          {{item.label}}
        </a>
      </template>
    </div>
    <div class="right">

      <!--切换主题-->
      <a class="nav-item icon-box" @click="switchThemeThrottling">
        <Icon :icon="isDark() ? 'line-md:moon' : 'ph:sun-bold'" title="theme" :class="['icon', isDark() ? 'icon-color__dark' : 'icon-color__light']"/>
      </a>
      <!--切换语言-->
      <a class="nav-item icon-box" @click="changeLanguageThrottling">
        <Icon :icon="locale === 'zh' ? 'mdi:ideogram-chinese-japanese-korean-variant' : 'ri:english-input'" title="theme"
              :class="['icon', isDark() ? 'icon-color__dark' : 'icon-color__light']"/>
      </a>
      <!--社交链接-->
      <a class="nav-item icon-box" v-for="social in socialLink" :href="social.link" :key="social.title" target="_blank">
        <Icon :icon="social.icon" :title="social.title" :class="['icon', isDark() ? 'icon-color__dark' : 'icon-color__light']"/>
      </a>

      <!-- 当为移动设备， 显示打开菜单界面的按钮 -->
      <a class="nav-item icon-box" @click="router.push('/menu')" v-if="device.mobile()">
        <Icon icon="gg:menu-round"
              :class="['icon', isDark() ? 'icon-color__dark' : 'icon-color__light']"
        />
      </a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "../mixin.scss";
$icon-color__light: #000;
$icon-color__dark: #fff;

nav {
  box-sizing: border-box;
  height: 15vh;
  background-color: transparent;
  padding: 20px 40px 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
  }


  .right {
    flex-direction: row-reverse;
  }
}

.nav-item {
  @include flex-center;
  transition: background-color 1s;
  height: 3vw;
  cursor: pointer;
  border-radius: 10%;
  font-family: inherit;

  &.icon-box {
    width: auto;
    margin-left: 1vw;
  }

  &.text-box {
    box-sizing: border-box;
    padding: 0 5px 0 5px;
    margin-right: 1vw;
    font-size: max(1.5vw, 15px);
    color: #7f7f7f;
    border-radius: 5px;
  }

  @media (any-hover: hover) {
    &:hover {
      background: #c7c5c5;
    }
  }

  $icon-size: 30px;

  .icon {
    font-size: $icon-size;
  }

  .icon-color__light {
    color: $icon-color__light;
  }

  .icon-color__dark {
    color: $icon-color__dark;
  }
}
</style>
