<script setup lang="ts">
import {TimeLineEvent} from "./types.ts"
import {onMounted, ref} from "vue";
import {isScrolledToBottom, isScrolledToTop} from "./scrollUtils.ts";
import {addSwipeListener, ScrollDirection} from "../../utils/swipe.ts";

const events: TimeLineEvent[] = [
  {
    year: '2003',
    month: '8',
    events: [
      {title: "出生"}
    ]
  },
  {
    year: '2021',
    events: [
      {title: '西南石油大学', description: '计算机科学学院-软件工程专业'}
    ]
  },
  {
    year: '2022',
    month: '4',
    events: [
      {title: '智测团队'}
    ]
  },
  {
    year: '2023',
    month: '4',
    events: [
      {
        html: `<h3 class="timeline__title">
                <a class="timeline-title__link" href="https://github.com/lec-org" target="_blank">乐程团队</a>
               </h3>`
      }
    ]
  },
  {
    year: '2023',
    month: '11',
    events: [
      {title: '百度', description: '搜索前端-实习生'}
    ]
  }
]

const timeline = ref<HTMLDivElement | null>(null);

// 阻止鼠标滚轮冒泡
function timelineWheel(e: WheelEvent) {
  const element = timeline.value as HTMLDivElement;
  if (
      !(e.deltaY > 0 && isScrolledToBottom(element))
      && !(e.deltaY < 0 && isScrolledToTop(element))
  ) {
    e.stopPropagation();
  }
}

// 阻止手机滑动冒泡
onMounted(() => {
  const element = timeline.value as HTMLDivElement;

  // 监听element的touchstart事件和touchmove事件
  // 通过touchstart的坐标和touchmove的坐标计算出滑动的方向
  // 如果是向上滑动并且已经滑动到底部，或者向下滑动并且已经滑动到顶部， 不阻止冒泡， 否则阻止冒泡
  let stopBubble = true;
  addSwipeListener(element, (direction) => {
     stopBubble = !(
        (direction === ScrollDirection.Up && isScrolledToBottom(element))
        || (direction === ScrollDirection.Down && isScrolledToTop(element))
    );
  }, {
    touchStartCallback: (e) => {
      stopBubble ? e.stopPropagation() : stopBubble = true;
    }
  })
})
</script>

<template>
  <div class="time-line-container" @wheel="timelineWheel" ref="timeline">
    <div class="timeline">
      <template v-for="event in events">
        <h2 class="timeline__item timeline__item--year">{{event.year + (event.month ? '-' + event.month: '')}}</h2>
        <div class="timeline__item" v-for="es in event.events">
          <div v-if="es.html" v-html="es.html"></div>
          <template v-else>
            <h3 v-if="es.title" class="timeline__title">{{es.title}}</h3>
            <p v-if="es.description" class="timeline__blurb">{{ es.description }}</p>
          </template>
        </div>
      </template>
      <h2 class="timeline__item timeline__item--year">今天</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../mixin.scss";
.time-line-container {
  @include fill-up;
  overflow-y: scroll;
  @include hide-scrollbar;
}

$color: skyblue;
$lineColor: hotpink;
$fontColor: #bbb;
$bgColor1: #222;
$bgColor2: #444;
$yearBgColor: #333;

$breakpoint: 700px;

* {
  box-sizing: border-box;
}

.timeline {
  position: relative;
  padding: 1rem;
  margin: 0 auto;
  max-width: 1300px;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    border: 1px solid $lineColor;
    right: 40px;
    top: 0;
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  @media screen and (min-width: $breakpoint) {
    padding: 2rem;
    &:before {
      left: calc(50% - 1px);
      right: auto;
    }
  }
}

.timeline__item {

  padding: 1rem;
  border: 2px solid $lineColor;
  border-image: linear-gradient(to right, $color 0%, $lineColor 100%);
  border-image-slice: 1;
  position: relative;
  margin: 1rem 3rem 1rem 1rem;
  clear: both;

  &:after,
  &:before {
    content: '';
    position: absolute;
  }

  &:before {
    right: -10px;
    top: calc(50% - 5px);
    border-style: solid;
    border-color: $lineColor $lineColor transparent transparent;
    border-width: 10px;
    transform: rotate(45deg);
  }

  @media screen and (min-width: $breakpoint) {
    width: 44%;
    margin: 1rem;

    &:nth-of-type(2n) {
      float: right;
      margin: 1rem;
      border-image: linear-gradient(to right, $lineColor 0%, $color 100%);
      border-image-slice: 1;

      &:before {
        right: auto;
        left: -10px;
        border-color: transparent transparent $lineColor $lineColor;
      }
    }
  }
}

.timeline__item--year {
  text-align: center;
  max-width: 150px;
  margin: 0 48px 0 auto;
  font-size: 1.8rem;
  background-color: $yearBgColor;
  line-height: 1;
  border-image: none;
  padding: .5rem 1rem 1rem;

  &:before {
    display: none;
  }

  @media screen and (min-width: $breakpoint) {
    text-align: center;
    margin: 0 auto;

    &:nth-of-type(2n) {
      float: none;
      margin: 0 auto;
      border-image: none;

      &:before {
        display: none;
      }
    }
  }
}

</style>

<style>
.timeline__title {
  margin: 0;
  font-family: 'Raleway', sans-serif;
  font-size: 1.5em;
}

.timeline__blurb {
  line-height: 1.5;
  font-size: 1rem;
  margin: .5rem 0 0;
}

.timeline-title__link {
  border-bottom: #c7c5c5 solid 1px;
  color: #bbb;

  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>