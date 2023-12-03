<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {useThemeStore} from "../stores/theme-store";
import {useI18n} from "vue-i18n";
import {useLanguageStore} from "../stores/language-store";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {usePhone} from '../hooks/isPhone.ts'
import {throttle} from 'lodash'


const {isDark, switchTheme} = useThemeStore();
const {locale, t} = useI18n();
const {changeLanguage} = useLanguageStore();
const router = useRouter();
const {isPhone} = usePhone();

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
    {label: t('menus.idols'), route: '/idols'}
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

    <!-- 菜单栏， 当屏幕宽度大于770px时显示 -->
    <div class="menu">
      <template v-if="!isPhone">
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

      <!-- 当屏幕宽度小于770时， 显示打开菜单界面的按钮 -->
      <a class="nav-item icon-box" @click="router.push('/menu')" v-if="isPhone">
        <Icon icon="gg:menu-round"
              :class="['icon', isDark() ? 'icon-color__dark' : 'icon-color__light']"
        />
      </a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
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
  transition: background-color 1s;
  display: flex;
  height: 3vw;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10%;
  font-family: inherit;

  &.icon-box {
    width: 3vw;
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
  &:hover {
    background: #c7c5c5;
  }

  //.icon {
  //  width: 20px;
  //  height: 20px;
  //}

  .icon {
    width: 2vw;
    height: 2vw;
  }

  .icon-color__light {
    color: $icon-color__light;
  }

  .icon-color__dark {
    color: $icon-color__dark;
  }
}
</style>
