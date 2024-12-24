import CommentForm from '../CommentForm/CommentForm.tsx';
import { TComment } from '../../types/comments.ts';
import ReviewsItem from '../ReviewsItem/ReviewsItem.tsx';
import { useAppSelector } from '../../hooks';

function ReviewsList() {
  const comments = useAppSelector((state) => state.comments);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      {comments.length > 0 && (
        <ul className="reviews__list">
          {comments.slice(0, 9).map((comment: TComment) => (
            <ReviewsItem key={comment.id} commentItem={comment} />
          ))}
        </ul>
      )}
      <CommentForm />
    </section>
  );
}

export default ReviewsList;
