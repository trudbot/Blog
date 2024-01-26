<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();
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
</script>

<template>
  <div class="menu-list-container">
    <ul>
      <li v-for="menu in menuItems">
        <router-link :to="menu.route" class="menu-text">
          {{menu.label}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-list-container {
  width: 80%;
  margin: 0 auto;

  ul {
    padding-left: 20px;
    font-size: clamp(1.5rem, 5vw, 2rem);
    li {
      margin-top: max(15px, 2vw);
      line-height: 7vw;
      border-bottom: 2px dashed #999;

      .menu-text {
        padding-left: 5px;
      }
    }
  }
}
</style>
