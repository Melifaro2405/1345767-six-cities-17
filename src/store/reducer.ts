import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortType,
  loadOffers,
  getOffersByCity,
  sortOffers,
  requireAuth,
  setOffersLoadingStatus,
} from './action.ts';
import { TOffer } from '../types/offers.ts';
import { AuthStatus, CityTypes, SortTypes } from '../const.ts';
import { getSortedOffers } from '../utils/getSortedOffers.ts';
import { getFilteredOffers } from '../utils/getFilteredOffers.ts';

type TInitialState = {
  city: CityTypes;
  sortType: SortTypes;
  offers: TOffer[];
  offersByCity: TOffer[];
  authStatus: AuthStatus;
  isOffersLoading: boolean;
};

const initialState: TInitialState = {
  city: CityTypes.Paris,
  sortType: SortTypes.Popular,
  offers: [],
  offersByCity: [],
  authStatus: AuthStatus.Unknown,
  isOffersLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuth, (state, { payload }) => {
      state.authStatus = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(setOffersLoadingStatus, (state, { payload }) => {
      state.isOffersLoading = payload;
    })
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(changeSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(sortOffers, (state) => {
      state.offersByCity = getSortedOffers(state);
    })
    .addCase(getOffersByCity, (state, { payload }) => {
      state.offersByCity = getFilteredOffers(state.offers, payload);
    });
});

export { reducer };
