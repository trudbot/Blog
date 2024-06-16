<script setup lang="ts">
import { ref, watch } from 'vue';
import cloud from 'd3-cloud';
import * as d3 from 'd3';
import { dark } from '../assets/colorSystem';
import pkg from 'lodash';
import { useElementSize } from '@vueuse/core';

const { throttle, debounce } = pkg;

export interface Props {
  data: {
    text: string;
    size: number;
    [key: string]: any;
  }[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: 'click', d: any): void;
  (e: 'drawStart'): void;
  (e: 'drawEnd'): void;
}>();


const cloudRef = ref<HTMLDivElement | null>(null);
const {width, height} = useElementSize(cloudRef);

function render(data: {text: string; size: number}[], x: number, y: number) {
  emits('drawStart');
  cloudRef.value && (cloudRef.value.innerHTML = '');
  try {
    const observer = new MutationObserver(() => {
      emits('drawEnd');
      observer.disconnect();
    })
    observer.observe(cloudRef.value as Node, {
      childList: true
    });
  } catch (e) {
    console.log(e);
    emits('drawEnd');
  }

  const layout = cloud()
    .size([x, y])
    .words(data)
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size || 50; })
    .on("end", draw);

  function draw(words: any[]) {
    d3.select("#word-cloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", () => {
        return dark[Math.floor(Math.random() * dark.length)];
      })
      .style("cursor", "pointer")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; })
      .on("click", function(d) {
        emits('click', d.target.__data__);
      })
    // emits('drawEnd');
  }
  layout.start();
}

const drawThrottle = throttle(render, 5000, {
  leading: true,
  trailing: false
});

const drawDebounce = debounce(drawThrottle, 1000);
watch([width, height, () => props.data], () => {
  if (cloudRef.value && props.data && width.value && height.value) {
    drawDebounce(JSON.parse(JSON.stringify(props.data)), width.value, height.value);
  }
})
</script>

<template>
  <div id="word-cloud" ref="cloudRef"></div>
</template>

<style scoped lang="scss">
#word-cloud {
  width: 100%;
  height: 100%;
}
</style>