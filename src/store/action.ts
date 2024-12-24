import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, CityTypes, SortTypes } from '../const.ts';
import { TOffer, TOfferById } from '../types/offers.ts';
import { TComment } from '../types/comments.ts';

export const changeCity = createAction<CityTypes>('data/changeCity');

export const changeSortType = createAction<SortTypes>('data/changeSortType');

export const loadOffers = createAction<TOffer[]>('data/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>(
  'data/setOffersLoadingStatus',
);

export const setOfferById = createAction<TOfferById>('data/setOfferById');
export const setOfferByIdLoadingStatus = createAction<boolean>(
  'data/setOfferByIdLoadingStatus',
);

export const setOffersNearby = createAction<TOffer[]>('data/setOffersNearby');
export const setOffersNearbyLoadingStatus = createAction<boolean>(
  'data/setOffersNearbyLoadingStatus',
);

export const setOfferComments = createAction<TComment[]>(
  'comments/setOfferComments',
);

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
