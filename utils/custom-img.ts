// 初始化函数
export function initializeImageInteractions() {
  if (!document) return;
  const images = document.querySelectorAll('.VPDoc .vp-doc img');
  images.forEach(image => {
    // 移除之前的事件监听器
    image.removeEventListener('click', handleImageClick);
    // 添加新的事件监听器
    image.addEventListener('click', handleImageClick);
  });
}

// 事件处理函数
function handleImageClick(event: Event) {
  const image = event.currentTarget as HTMLImageElement;
  image.classList.toggle('scale');
}