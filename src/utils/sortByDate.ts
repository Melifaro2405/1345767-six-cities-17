import { TComment } from '../types/comments.ts';

export const sortByDate = (data: TComment[]) =>
  data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
