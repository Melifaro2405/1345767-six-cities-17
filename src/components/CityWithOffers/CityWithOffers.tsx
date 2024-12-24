import OffersList from '../OffersList/OffersList.tsx';
import Map from '../Map/Map.tsx';
import { useAppSelector } from '../../hooks';
import OffersSorting from '../OffersSorting/OffersSorting.tsx';
import { useState } from 'react';
import { TOffer } from '../../types/offers.ts';

type TCityWithOffersProps = {
  offers: TOffer[];
};

function CityWithOffers({ offers }: TCityWithOffersProps) {
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>();

  const city = useAppSelector((state) => state.city);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {city}
        </b>
        <OffersSorting />
        <div className="cities__places-list places__list tabs__content">
          <OffersList offers={offers} setActiveOffer={setActiveOffer} />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offers={offers} activeOffer={activeOffer} />
        </section>
      </div>
    </div>
  );
}

export default CityWithOffers;
