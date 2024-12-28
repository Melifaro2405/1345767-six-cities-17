import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingRadioGroup from './RatingRadioGroup.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus } from '../../const.ts';
import { TCommentFormData } from '../../types/comments.ts';
import { submitCommentAction } from '../../store/api-actions.ts';

const MinCommentLength = 50;

const initialFormState: TCommentFormData = {
  offerId: '',
  comment: '',
  rating: 0,
};

function CommentForm() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const authStatus = useAppSelector((state) => state.authStatus);

  const [formState, setFormState] =
    useState<TCommentFormData>(initialFormState);

  const handleChangeFormValue = (
    value: string | number,
    field: 'comment' | 'rating',
  ) => {
    setFormState({ ...formState, offerId: id as string, [field]: value });
  };

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(submitCommentAction(formState));
    setFormState(initialFormState);
  };

  const { rating, comment } = formState;

  if (authStatus !== AuthStatus.Auth) {
    return null;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitForm}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <RatingRadioGroup rating={+rating} handleChange={handleChangeFormValue} />
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt) => handleChangeFormValue(evt.target.value, 'comment')}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span> and describe your stay
          with at least
          <b className="reviews__text-amount"> {MinCommentLength} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || comment.length < MinCommentLength}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
