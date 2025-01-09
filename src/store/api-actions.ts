import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAppDispatch, TState } from '../types/state.ts';
import { APIRoute, AppRoute, AuthStatus } from '../const.ts';
import { TFavoriteStatus, TOffer, TOfferById } from '../types/offers.ts';
import {
  loadOfferById,
  loadOffers,
  redirectToRoute,
  requireAuth,
  setOfferByIdLoadingStatus,
  setOffersLoadingStatus,
  setOffersNearbyLoadingStatus,
  loadOffersNearby,
  setOfferComments,
  setFavoriteOffersLoadingStatus,
  loadFavoriteOffers,
  loadCurrentOffer,
  setCurrentOfferLoadingStatus,
} from './action.ts';
import { TAuthData } from '../types/auth-data.ts';
import {
  dropStorageUserData,
  saveStorageUserData,
} from '../services/auth-user-data.ts';
import { TUserData } from '../types/user-data.ts';
import { TComment, TCommentFormData } from '../types/comments.ts';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: TState;
  dispatch: TAppDispatch;
  extra: AxiosInstance;
}>();

export const checkAuthAction = createAppAsyncThunk<void, undefined>(
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

export const loginAction = createAppAsyncThunk<void, TAuthData>(
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

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropStorageUserData();
    dispatch(requireAuth(AuthStatus.NoAuth));
  },
);

export const fetchOffers = createAppAsyncThunk<void, undefined>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferByIdAction = createAppAsyncThunk<void, string>(
  'data/fetchOfferById',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferByIdLoadingStatus(true));

    try {
      const { data } = await api.get<TOfferById>(`${APIRoute.Offers}/${id}`);
      dispatch(setOfferByIdLoadingStatus(false));
      dispatch(loadOfferById(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchOffersNearbyAction = createAppAsyncThunk<void, string>(
  'data/fetchNearbyOffers',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersNearbyLoadingStatus(true));

    const { data } = await api.get<TOffer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffersNearbyLoadingStatus(false));
    dispatch(loadOffersNearby(data));
  },
);

export const fetchFavoriteOffersAction = createAppAsyncThunk<void, undefined>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFavoriteOffersLoadingStatus(true));

    const { data } = await api.get<TOffer[]>(APIRoute.Favorite);
    dispatch(setFavoriteOffersLoadingStatus(false));
    dispatch(loadFavoriteOffers(data));
  },
);

export const sendFavoriteStatusAction = createAppAsyncThunk<
  void,
  TFavoriteStatus
>(
  'data/fetchFavoriteOffers',
  async ({ id, status, isOfferById }, { dispatch, extra: api }) => {
    setCurrentOfferLoadingStatus(true);
    try {
      const { data } = await api.post<TOffer>(
        `${APIRoute.Favorite}/${id}/${status}`,
      );
      dispatch(loadCurrentOffer(data));
      dispatch(fetchFavoriteOffersAction());

      if (isOfferById) {
        dispatch(fetchOfferByIdAction(id));
      }
    } catch {
      dispatch(redirectToRoute(AppRoute.Login));
    } finally {
      setCurrentOfferLoadingStatus(false);
    }
  },
);

export const fetchOfferCommentsAction = createAppAsyncThunk<void, string>(
  'comments/fetchOfferComments',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<TComment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setOfferComments(data));
  },
);

export const submitCommentAction = createAppAsyncThunk<void, TCommentFormData>(
  'comments/fetchSubmitComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<TComment>(`${APIRoute.Comments}/${offerId}`, {
      comment,
      rating: +rating,
    });
    dispatch(fetchOfferCommentsAction(offerId));
  },
);
