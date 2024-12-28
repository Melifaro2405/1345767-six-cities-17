import { groupOffersByCity } from '../../utils/groupOffersByCity.ts';
import { CityTypes } from '../../const.ts';
import { TOffer } from '../../types/offers.ts';
import OfferCard from '../OfferCard/OfferCard.tsx';

type TOffersFavoriteListProps = {
  favoriteOffers: TOffer[];
};

function OffersFavoriteList({ favoriteOffers }: TOffersFavoriteListProps) {
  const offersByCity = groupOffersByCity(favoriteOffers);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(offersByCity).map((city) => (
              <li key={city} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offersByCity[city as CityTypes].map((offer) => (
                    <OfferCard key={offer.id} offer={offer} isFavoriteCard />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default OffersFavoriteList;
