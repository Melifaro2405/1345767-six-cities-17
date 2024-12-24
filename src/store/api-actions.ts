import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.ts';
import { APIRoute, AppRoute, AuthStatus } from '../const.ts';
import { TOffer, TOfferById } from '../types/offers.ts';
import {
  setOfferById,
  loadOffers,
  redirectToRoute,
  requireAuth,
  setOfferByIdLoadingStatus,
  setOffersLoadingStatus,
  setOffersNearbyLoadingStatus,
  setOffersNearby,
  setOfferComments,
} from './action.ts';
import { TAuthData } from '../types/auth-data.ts';
import {
  dropStorageUserData,
  saveStorageUserData,
} from '../services/auth-user-data.ts';
import { TUserData } from '../types/user-data.ts';
import { TComment, TCommentFormData } from '../types/comments.ts';

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

export const fetchOfferByIdAction = createAsyncThunk<void, string, TExtraArgs>(
  'data/fetchOfferById',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferByIdLoadingStatus(true));

    try {
      const { data } = await api.get<TOfferById>(`${APIRoute.Offers}/${id}`);
      dispatch(setOfferByIdLoadingStatus(false));
      dispatch(setOfferById(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<
  void,
  string,
  TExtraArgs
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  dispatch(setOffersNearbyLoadingStatus(true));

  const { data } = await api.get<TOffer[]>(`${APIRoute.Offers}/${id}/nearby`);
  dispatch(setOffersNearbyLoadingStatus(false));
  dispatch(setOffersNearby(data));
});

export const fetchOfferCommentsAction = createAsyncThunk<
  void,
  string,
  TExtraArgs
>('comments/fetchOfferComments', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<TComment[]>(`${APIRoute.Comments}/${id}`);
  dispatch(setOfferComments(data));
});

export const fetchSubmitCommentAction = createAsyncThunk<
  void,
  TCommentFormData,
  TExtraArgs
>(
  'comments/fetchSubmitComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<TComment[]>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating: +rating,
    });
    dispatch(fetchOfferCommentsAction(offerId));
  },
);
