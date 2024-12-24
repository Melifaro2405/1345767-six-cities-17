import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortType,
  loadOffers,
  requireAuth,
  setOffersLoadingStatus,
  setOfferById,
  setOffersNearby,
  setOfferComments,
} from './action.ts';
import { TOffer, TOfferById } from '../types/offers.ts';
import { AuthStatus, CityTypes, SortTypes } from '../const.ts';
import { TComment } from '../types/comments.ts';
import { sortByDate } from '../utils/sortByDate.ts';

type TInitialState = {
  city: CityTypes;
  sortType: SortTypes;
  offers: TOffer[];
  offersNearby: TOffer[];
  offerById: TOfferById;
  authStatus: AuthStatus;
  isOffersLoading: boolean;
  isOfferByIdLoading: boolean;
  isOffersNearbyLoading: boolean;
  comments: TComment[];
};

const initialState: TInitialState = {
  city: CityTypes.Paris,
  sortType: SortTypes.Popular,
  offers: [],
  offersNearby: [],
  offerById: {} as TOfferById,
  authStatus: AuthStatus.Unknown,
  isOffersLoading: false,
  isOfferByIdLoading: false,
  isOffersNearbyLoading: false,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuth, (state, { payload }) => {
      state.authStatus = payload;
    })
    .addCase(loadOffers, (state, { payload }) => {
      state.offers = payload;
    })
    .addCase(setOffersNearby, (state, { payload }) => {
      state.offersNearby = payload.slice(0, 3);
    })
    .addCase(setOfferById, (state, { payload }) => {
      state.offerById = payload;
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
    .addCase(setOfferComments, (state, { payload }) => {
      state.comments = sortByDate(payload);
    });
});

export { reducer };
