<script setup lang="ts">
import WordCloud from '../components/WordCloud.vue';
import { data } from '../data/fontmatter-handler.data.mjs';
import { computed, onMounted, ref } from 'vue';
import Loading from '../components/Loading.vue';
import { useLoading } from '../hooks/useLoading.mjs';

const [tags] = data;
const {loading, startLoading, stopLoading} = useLoading();

const ratio = ref(25);
const list = computed(() => {
    return tags.list.map(n => ({text: n.text, size: n.size * ratio.value}));
});

onMounted(() => {
    startLoading();
    if (window.screen.width <= 600) {
        ratio.value = 15;
    }
});

function drawStart() {
    startLoading();
    console.log('drawStart');
}
</script>

<template>
    <div class="tags">
        <div class="word-cloud-wrapper">
            <WordCloud
                :data="list"
                @draw-start="drawStart"
                @draw-end="stopLoading()"
            />
            <Loading v-model="loading"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.word-cloud-wrapper {
  height: 40vh;
  margin-top: 10vh;
  position: relative;
}
</style>