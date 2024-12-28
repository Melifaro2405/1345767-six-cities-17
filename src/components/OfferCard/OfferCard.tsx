import { TOffer } from '../../types/offers.ts';
import { getRatingStyles } from '../../utils/getRatingStyles.ts';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { sendFavoriteStatusAction } from '../../store/api-actions.ts';

type TOfferCardProps = {
  offer: TOffer;
  isNearbyCard?: boolean;
  isFavoriteCard?: boolean;
};

function OfferCard({ offer, isNearbyCard, isFavoriteCard }: TOfferCardProps) {
  const dispatch = useAppDispatch();

  const {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    type,
    title,
    isFavorite,
  } = offer;

  const handleSwitchFavorite = () => {
    dispatch(sendFavoriteStatusAction({ id, status: isFavorite ? 0 : 1 }));
  };

  return (
    <article
      className={classNames(
        { 'cities--card': !isNearbyCard || !isFavoriteCard },
        { 'near-places__card': isNearbyCard },
        // eslint-disable-next-line camelcase
        { favorites__card: isFavoriteCard },
        'place-card',
      )}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={classNames(
          { 'cities__image-wrapper': !isFavoriteCard },
          { 'favorites__image-wrapper': isFavoriteCard },
          'place-card__image-wrapper',
        )}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isFavoriteCard ? '150' : '260'}
            height={isFavoriteCard ? '110' : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={classNames(
          { 'favorites__card-info': isFavoriteCard },
          'place-card__info',
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': isFavorite },
              'button',
            )}
            type="button"
            onClick={handleSwitchFavorite}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            {isFavorite && (
              <span className="visually-hidden">In bookmarks</span>
            )}
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRatingStyles(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  );
}

export default OfferCard;
