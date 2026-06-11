export type CardColor = "red" | "blue" | "green" | "yellow" | "wild";

export type CardValue =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "wild";

export interface GameCard {
  id: string;
  color: CardColor;
  value: CardValue;
}

export type ValidationStatus = "idle" | "success" | "error";