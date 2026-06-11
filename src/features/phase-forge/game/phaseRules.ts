import type { GameCard } from "./types";

export function isValidSet(cards: GameCard[]): boolean {
  if (cards.length !== 3) {
    return false;
  }

  return isThreeOfAKind(cards) || isThreeCardRun(cards);
}

function isThreeOfAKind(cards: GameCard[]): boolean {
  const nonWildCards = cards.filter((card) => card.value !== "wild");

  if (nonWildCards.length === 0) {
    return true;
  }

  const firstValue = nonWildCards[0].value;

  return nonWildCards.every((card) => card.value === firstValue);
}

function isThreeCardRun(cards: GameCard[]): boolean {
  const nonWildValues = cards
    .filter((card) => card.value !== "wild")
    .map((card) => Number(card.value))
    .sort((a, b) => a - b);

  if (nonWildValues.length === 0) {
    return true;
  }

  const uniqueValues = new Set(nonWildValues);

  if (uniqueValues.size !== nonWildValues.length) {
    return false;
  }

  const possibleStarts = Array.from({ length: 10 }, (_, index) => index + 1);

  return possibleStarts.some((start) => {
    const run = [start, start + 1, start + 2];

    return nonWildValues.every((value) => run.includes(value));
  });
}