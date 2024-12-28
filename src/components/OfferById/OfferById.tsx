import classNames from 'classnames';
import Map from '../Map/Map.tsx';
import { getRatingStyles } from '../../utils/getRatingStyles.ts';
import ReviewsList from '../ReviewsList/ReviewsList.tsx';
import { getNoun } from '../../utils/getNoun.ts';
import { TOffer, TOfferById } from '../../types/offers.ts';
import { sendFavoriteStatusAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks';

type TOfferByIdProps = {
  offerById: TOfferById;
  offersNearby: TOffer[];
};

function OfferById({ offerById, offersNearby }: TOfferByIdProps) {
  const dispatch = useAppDispatch();

  const {
    id,
    images,
    isPremium,
    title,
    isFavorite,
    rating,
    maxAdults,
    type,
    bedrooms,
    price,
    goods,
    description,
    host: { name, isPro, avatarUrl },
  } = offerById;

  const handleSwitchFavorite = () => {
    dispatch(
      sendFavoriteStatusAction({
        id,
        status: isFavorite ? 0 : 1,
        isOfferById: true,
      }),
    );
  };

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images?.slice(0, 6).map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <button
              className={classNames(
                'offer__bookmark-button',
                { 'offer__bookmark-button--active': isFavorite },
                'button',
              )}
              type="button"
              onClick={handleSwitchFavorite}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={getRatingStyles(rating)}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {getNoun('Bedroom', bedrooms)}
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {getNoun('Adult', maxAdults)}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {!!goods?.length &&
                goods.map((item) => (
                  <li key={item} className="offer__inside-item">
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div
                className={classNames(
                  'offer__avatar-wrapper',
                  { 'offer__avatar-wrapper--pro': isPro },
                  'user__avatar-wrapper',
                )}
              >
                <img
                  className="offer__avatar user__avatar"
                  src={avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="offer__user-name"> {name} </span>
              {isPro && <span className="offer__user-status"> Pro </span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">{description}</p>
            </div>
          </div>
          <ReviewsList />
        </div>
      </div>
      <section className="offer__map map">
        <Map offers={offersNearby} activeOffer={offerById} isNearby />
      </section>
    </section>
  );
}

export default OfferById;
