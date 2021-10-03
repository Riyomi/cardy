import { card } from './Card';
import { category } from './Category';
import { user } from './User';

export type deck = {
  id: string;
  publicId: string | null;
  title: string;
  img: string;
  category: category;
  user: user;
  learners?: user[];
  cards: card[];
  createdBy: user;
  mastered: number;
};
