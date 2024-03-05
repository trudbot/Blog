import {parsePXValue} from './domUtils.ts';
// group content 边框
export const barSize = '16px';
// app距content的距离
export const offset = '4px';

/*
将app移动到group content 外部
1. 移动到最近的一条边
2. 移动时按照app中心和group中心形成的向量进行移动
3. 若按向量移动导致app超出group范围，则将app移动到group边缘
 */
export function hideApp(container: HTMLElement, app: HTMLElement | null) {
  if (!app) {
    return;
  }
  const appStyle = window.getComputedStyle(app);
  const containerStyle = window.getComputedStyle(container);
  const containerWidth = parsePXValue(containerStyle.width);
  const containerHeight = parsePXValue(containerStyle.height);
  const width = parsePXValue(appStyle.width);
  const height = parsePXValue(appStyle.height);

  const left = parsePXValue(appStyle.left);
  const top = parsePXValue(appStyle.top);

  const barSizeValue = parsePXValue(barSize);
  const offsetValue = parsePXValue(offset);

  const toLeftX = barSizeValue - offsetValue - left - width;
  const toRightX = containerWidth - barSizeValue + offsetValue - left;
  const toTopY = barSizeValue - offsetValue - top - height;
  const toBottomY = containerHeight - barSizeValue + offsetValue - top;

  const offsetX = Math.abs(toLeftX) < Math.abs(toRightX) ? toLeftX : toRightX;
  const offsetY = Math.abs(toTopY) < Math.abs(toBottomY) ? toTopY : toBottomY;

  const containerCenter = [containerWidth / 2, containerHeight / 2];
  const appCenter = [left + width / 2, top + height / 2];
  const transform = {
    X: 0,
    Y: 0
  }
  // 以距离最短为原则确定移动的主轴， 并以此计算另一条轴的移动距离
  // 因为屏幕一般长度比宽度大的多， 所以Y轴移动距离大概率更小
  // 所以Y轴的距离乘以浏览器宽高比， 与X轴的距离比较
  const ratio = window.innerWidth / window.innerHeight;
  if (Math.abs(offsetX) < ratio * Math.abs(offsetY)) {
    transform.X = offsetX;
    if (containerCenter[0] - appCenter[0] === 0) {
      transform.Y = 0;
    } else {
      transform.Y = offsetX * (containerCenter[1] - appCenter[1]) / (containerCenter[0] - appCenter[0]);
    }
    // 超出group
    if (transform.Y > 0 && transform.Y > toBottomY) {
      transform.Y = toBottomY - height / 3;
    } else if (transform.Y < 0 && transform.Y < toTopY) {
      transform.Y = toTopY + height / 3;
    }
  } else {
    transform.Y = offsetY;
    if (containerCenter[1] - appCenter[1] === 0) {
      transform.X = 0;
    } else {
      transform.X = offsetY * (containerCenter[0] - appCenter[0]) / (containerCenter[1] - appCenter[1]);
    }
    // 超出group
    if (transform.X > 0 && transform.X > toRightX) {
      transform.X = toRightX - width / 3;
    } else if (transform.X < 0 && transform.X < toLeftX) {
      transform.X = toLeftX + width / 3;
    }
  }
  app.style.transform = `translate(${transform.X}px, ${transform.Y}px)`;
}
