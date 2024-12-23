import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, CityTypes, SortTypes } from '../const.ts';
import { TOffer } from '../types/offers.ts';

export const changeCity = createAction<CityTypes>('data/changeCity');

export const getOffersByCity = createAction<CityTypes>('data/getOffersByCity');

export const changeSortType = createAction<SortTypes>('data/changeSortType');

export const sortOffers = createAction('data/sortOffers');

export const setOffersLoadingStatus = createAction<boolean>(
  'data/setOffersLoadingStatus',
);

export const loadOffers = createAction<TOffer[]>('data/loadOffers');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
