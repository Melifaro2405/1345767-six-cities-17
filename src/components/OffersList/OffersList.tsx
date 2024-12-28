import { TOffer } from '../../types/offers.ts';
import OfferCard from '../OfferCard/OfferCard.tsx';

type TOffersListProps = {
  offers: TOffer[];
  setActiveOffer?: (offer: TOffer | undefined) => void;
  isNearby?: boolean;
};

function OffersList({ offers, setActiveOffer, isNearby }: TOffersListProps) {
  const handleMouseEnter = (offer: TOffer) =>
    setActiveOffer && setActiveOffer(offer);

  const handleMouseLeave = () => setActiveOffer && setActiveOffer(undefined);

  return (
    <>
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        >
          <OfferCard offer={offer} isNearbyCard={isNearby} />
        </div>
      ))}
    </>
  );
}

export default OffersList;
