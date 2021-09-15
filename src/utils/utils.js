export function getUserProgress(exp) {
  const level = parseInt(Math.sqrt(exp / 50)) + 1;
  const value = Math.sqrt(exp / 50);
  const progress = ((value - Math.floor(value)) * 100).toFixed(2);

  return {
    level: level > 99 ? 99 : level,
    progress: progress,
  };
}

export function timeLeftUntilReview(card) {
  if (!card.nextReview) return '-';

  const timeLeft = card.nextReview - Date.now();

  if (timeLeft < 0) return 'now';

  if (timeLeft / (1000 * 60 * 60 * 24) > 0.5) {
    return `in ${Math.round(timeLeft / (1000 * 60 * 60 * 24))} day(s)`;
  } else if (timeLeft / (1000 * 60 * 60) > 0.5) {
    return `in ${Math.round(timeLeft / (1000 * 60 * 60))} hour(s)`;
  } else {
    return `in ${Math.round(timeLeft / (1000 * 60))} minute(s)`;
  }
}

export function getSeenCards(cards) {
  return cards.filter((card) => card.nextReview).length;
}

export function getDeckProgression(deck) {
  if (!deck || !deck.cards) return;
  if (!deck.cards.length) return 0;

  return (getSeenCards(deck.cards) / deck.cards.length) * 100;
}

export function cardsDueTo(cards) {
  return cards.filter(
    (card) => card.nextReview && card.nextReview - Date.now() <= 0
  );
}

export function getWelcomeMessage() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 4 && hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}
