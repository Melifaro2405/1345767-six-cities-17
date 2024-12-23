import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.ts';
import { APIRoute, AppRoute, AuthStatus } from '../const.ts';
import { TOffer } from '../types/offers.ts';
import {
  loadOffers,
  redirectToRoute,
  requireAuth,
  setOffersLoadingStatus,
} from './action.ts';
import { TAuthData } from '../types/auth-data.ts';
import {
  dropStorageUserData,
  saveStorageUserData,
} from '../services/auth-user-data.ts';
import { TUserData } from '../types/user-data.ts';

type TExtraArgs = {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
};

export const checkAuthAction = createAsyncThunk<void, undefined, TExtraArgs>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, TAuthData, TExtraArgs>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, {
      email,
      password,
    });
    saveStorageUserData(data);
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, TExtraArgs>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropStorageUserData();
    dispatch(requireAuth(AuthStatus.NoAuth));
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, TExtraArgs>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);
