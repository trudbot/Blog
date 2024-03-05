import dom2Img from 'dom-to-image-more';

// This function is used to generate a snapshot of the element
// 相关的工具库如dom-to-image、html2canvas都存在维护风险, 因此将其封装，以便于后续的维护中可以更换底层实现
export async function generateSnapshot(ele: HTMLElement) {
  const base64 = await dom2Img.toPng(ele);
  return `
    <img
      src="${base64}"
      alt="snapshot"
      class="img-in-rect"
      style="width: 100%;"
    />
  `
}
