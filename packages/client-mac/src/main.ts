import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import dom2Img from 'dom-to-image'

const app = createApp(App);
app.directive('visibility', (el, binding) => {
  el.style.visibility = binding.value ? 'visible' : 'hidden';
})
app.mount('#app');

// setTimeout(() => {
//   dom2Img.toPng(document.getElementById('app')!).then(dataurl => {
//     console.log('结果');
//     console.log(dataurl);
//   })
// }, 10000);