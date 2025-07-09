export function getCollapsedCards(scroll, collapseStep, cardCount) {
  return Array(cardCount)
    .fill(false)
    .map((_, i, arr) =>
      i < arr.length - 1 ? scroll >= (i + 1) * collapseStep : false
    );
}