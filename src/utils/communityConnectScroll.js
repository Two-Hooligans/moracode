export function getCollapsedStates(scrollY, sectionTop, windowHeight, collapseStep, itemCount) {
  let y = scrollY + windowHeight * 0.2 - sectionTop;
  let collapsed = Array(itemCount).fill(false);
  for (let i = 0; i < itemCount; i++) {
    collapsed[i] = y >= collapseStep * (i + 1);
  }
  return collapsed;
}