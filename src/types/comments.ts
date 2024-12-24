export type TCommentUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type TComment = {
  id: string;
  date: string;
  user: TCommentUser;
  comment: string;
  rating: number;
};

export type TCommentFormData = {
  offerId: string;
  comment: string;
  rating: string;
};
