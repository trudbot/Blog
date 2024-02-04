<script setup lang="ts">
defineProps<{
  pics: string[];
  columns: number;
}>();
</script>

<template>
  <div class="pics-box">
    <div class="masonry">
      <div class="col" v-for="i in columns">
        <template v-for="(url, j) in pics">
          <img
            v-if="j % columns === i - 1"
            :src="url"
            alt="pic"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/mixin.scss";
.pics-box {
  @include fill-up;
  overflow-y: scroll;
}

.masonry {
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 2vw;

  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3vh;
    img {
      width: 100%;
    }
  }
}

//// css原生瀑布流布局
//@supports (grid-template-rows: masonry) {
//  .masonry {
//    width: 80%;
//    margin: 0 auto;
//    display: grid;
//    grid-template-columns: repeat(3, 1fr);
//    grid-template-rows: masonry;
//    grid-gap: 2vw;
//    img {
//      width: 100%;
//    }
//  }
//}


</style>
