export function setRotateAnimation(N: number, duration: number, ele: Element) {
  if (N < 1 || duration < 0 || !(ele instanceof Element)) {
    console.error('Invalid parameters');
    return {
      animation: null
    };
  }

  const pause = 0.6 / N;
  const keyframes: Keyframe[] = Array.from({length: N}).reduce((res, _curr, idx) => {
    const deg = (idx + 1) * 360 / N;
    const offset = (idx + 1) / N;
    return [
      ...res as Keyframe[],
      {
        transform: `rotate(${deg}deg)`,
        offset: offset - pause
      },
      {
        transform: `rotate(${deg}deg)`,
        offset: offset
      }
    ]
  }, []) as Keyframe[];
  const animation = ele.animate(keyframes, {
    duration: duration * N,
    iterations: Infinity
  });
  return {
    animation
  }
}
