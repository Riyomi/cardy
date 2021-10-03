import { deck } from './Deck';

export type user = {
  id: string;
  name: string;
  img: string;
  experience: number;
  followers: user[];
  following: user[];
  decks: deck[];
  mastered: number;
};
