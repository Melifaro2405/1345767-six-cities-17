import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortType,
  loadOffers,
  requireAuth,
  setOffersLoadingStatus,
  loadOfferById,
  loadOffersNearby,
  setOfferComments,
  loadFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  loadCurrentOffer,
  setCurrentOfferLoadingStatus,
} from './action.ts';
import { TOffer, TOfferById } from '../types/offers.ts';
import { AuthStatus, CityTypes, SortTypes } from '../const.ts';
import { TComment } from '../types/comments.ts';
import { sortByDate } from '../utils/sortByDate.ts';

type TInitialState = {
  city: CityTypes;
  sortType: SortTypes;
  offers: TOffer[];
  favoriteOffers: TOffer[];
  offersNearby: TOffer[];
  offerById: TOfferById;
  currentOffer: TOffer;
  authStatus: AuthStatus;
  isOffersLoading: boolean;
  isOfferByIdLoading: boolean;
  isOffersNearbyLoading: boolean;
  isFavoriteOffersLoading: boolean;
  isCurrentOfferLoading: boolean;
  comments: TComment[];
};

const initialState: TInitialState = {
  city: CityTypes.Paris,
  sortType: SortTypes.Popular,
  offers: [],
  favoriteOffers: [],
  offersNearby: [],
  offerById: {} as TOfferById,
  currentOffer: {} as TOffer,
  authStatus: AuthStatus.Unknown,
  isOffersLoading: false,
  isOfferByIdLoading: false,
  isOffersNearbyLoading: false,
  isFavoriteOffersLoading: false,
  isCurrentOfferLoading: false,
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
    .addCase(loadOffersNearby, (state, { payload }) => {
      state.offersNearby = payload.slice(0, 3);
    })
    .addCase(loadOfferById, (state, { payload }) => {
      state.offerById = payload;
    })
    .addCase(loadFavoriteOffers, (state, { payload }) => {
      state.favoriteOffers = payload;
    })
    .addCase(setFavoriteOffersLoadingStatus, (state, { payload }) => {
      state.isFavoriteOffersLoading = payload;
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
    })
    .addCase(loadCurrentOffer, (state, { payload }) => {
      state.currentOffer = payload;
      state.offers = state.offers.map((offer) => {
        if (offer.id === state.currentOffer.id) {
          return state.currentOffer;
        } else {
          return offer;
        }
      });
    })
    .addCase(setCurrentOfferLoadingStatus, (state, { payload }) => {
      state.isCurrentOfferLoading = payload;
    });
});

export { reducer };
