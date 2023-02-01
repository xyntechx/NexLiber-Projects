function clampBuilder(
  minWidthPx: number,
  maxWidthPx: number,
  minItemSize: number,
  maxItemSize: number
) {
  // const root = document.querySelector("html");
  // const pixelsPerRem = Number(getComputedStyle(root!).fontSize.slice(0, -2));

  const pixelsPerRem = Number("16px".slice(0, -2));

  const minWidth = minWidthPx / pixelsPerRem;
  const maxWidth = maxWidthPx / pixelsPerRem;

  const slope = (maxItemSize - minItemSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minItemSize;

  return `clamp( ${minItemSize}rem, ${yAxisIntersection}rem + ${
    slope * 100
  }vw, ${maxItemSize}rem )`;
}

export default clampBuilder;
