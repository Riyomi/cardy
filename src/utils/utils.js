export function getProgress(experience) {
  const level = parseInt(Math.sqrt(experience / 50)) + 1;
  const value = Math.sqrt(experience / 50);
  const progress = ((value - Math.floor(value)) * 100).toFixed(2);

  return {
    level: level > 99 ? 99 : level,
    progress: progress,
  };
}

export function getSeenCards(cards) {
  return cards.filter((card) => card.nextReview).length;
}

export function getDeckProgression(deck) {
  if (!deck || !deck.cards) return;
  if (!deck.cards.length) return 0;

  return (getSeenCards(deck.cards) / deck.cards.length) * 100;
}

export function getMasteredCards(cards) {
  return cards.filter((card) => card.mastered).length;
}

export function cardsDueTo(cards) {
  return cards.filter(
    (card) => card.nextReview && card.nextReview - Date.now() <= 0
  );
}
