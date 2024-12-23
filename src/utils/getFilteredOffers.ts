import { TOffer } from '../types/offers.ts';
import { CityTypes } from '../const.ts';

export const getFilteredOffers = (offers: TOffer[], currentCity: CityTypes) =>
  offers.filter((offer) => offer.city.name === currentCity);
