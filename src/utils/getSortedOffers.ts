import { CityTypes, SortTypes } from '../const.ts';
import { TOffer } from '../types/offers.ts';

export const getSortedOffers = (
  offers: TOffer[],
  sortType: SortTypes,
  city: CityTypes,
) => {
  const offersByCity = offers.filter((offer) => offer.city.name === city);

  return {
    [SortTypes.Popular]: [...offersByCity],
    [SortTypes.PriceLow]: [...offersByCity].sort((a, b) => a.price - b.price),
    [SortTypes.PriceHigh]: [...offersByCity].sort((a, b) => b.price - a.price),
    [SortTypes.TopRated]: [...offersByCity].sort((a, b) => b.rating - a.rating),
  }[sortType];
};
