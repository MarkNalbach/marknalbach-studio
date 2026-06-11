import type { CardColor, CardValue, GameCard } from "./types";

const colors: CardColor[] = ["red", "blue", "green", "yellow"];
const values: CardValue[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export function createDeck(): GameCard[] {
  const numberedCards = colors.flatMap((color) =>
    values.flatMap((value) => [
      {
        id: `${color}-${value}-a`,
        color,
        value,
      },
      {
        id: `${color}-${value}-b`,
        color,
        value,
      },
    ])
  );

  const wildCards: GameCard[] = Array.from({ length: 8 }, (_, index) => ({
    id: `wild-${index + 1}`,
    color: "wild",
    value: "wild",
  }));

  return shuffle([...numberedCards, ...wildCards]);
}

export function dealHand(deck: GameCard[], count = 10) {
  return {
    hand: deck.slice(0, count),
    drawPile: deck.slice(count),
  };
}

function shuffle(cards: GameCard[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}