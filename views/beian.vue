<script setup>

</script>

<template>
  <div class="beian">
    <a href="https://beian.miit.gov.cn/" rel="noopener" target="_blank">蜀ICP备2023017814号-1 </a>
    <img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407071401918.png" style="display: inline-block;">
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011402000613" rel="noopener" target="_blank">蜀公网安备 51011402000613 号 </a>
  </div>
</template>

<style scoped lang="scss">
a {
  border-bottom: 1px solid #999;
  color: #555;
  outline: 0;
  text-decoration: none;
  overflow-wrap: break-word;
  word-wrap: break-word;
  cursor: pointer;
}

.beian {
  margin-top: 10vh;
  position: sticky;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #666;
  text-align: center;
  background-color: var(--vp-c-bg);
  img {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
}
</style>