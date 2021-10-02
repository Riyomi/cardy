import { card } from './Card';
import { user } from './User';

export type deck = {
  id: string;
  title: string;
  img: string;
  learners?: user[];
  cards: card[];
  createdBy: user;
};
