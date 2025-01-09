import { ChangeEvent, Fragment } from 'react';

type TRatingRadioGroupProps = {
  rating: number;
  handleChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

function RatingRadioGroup({ rating, handleChange }: TRatingRadioGroupProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {[5, 4, 3, 2, 1].map((num) => (
        <Fragment key={num}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            checked={num === rating}
            value={num}
            id={`${num}-stars`}
            type="radio"
            onChange={handleChange}
          />
          <label
            htmlFor={`${num}-stars`}
            className="reviews__rating-label form__rating-label"
            title="perfect"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default RatingRadioGroup;
