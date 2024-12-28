import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../Layout/Layout.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';
import { Favorites, Login, Main, Offer, PageNotFound } from '../../pages';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import Loader from '../Loader/Loader.tsx';
import HistoryRouter from '../HistoryRouter/HistoryRouter.tsx';
import browserHistory from '../../browser-history.ts';

function App() {
  const authStatus = useAppSelector((state) => state.authStatus);
  const isLoading = useAppSelector((state) => state.isOffersLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authStatus={authStatus}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<Offer />} />
          </Route>
          <Route path={AppRoute.NotFound} element={<PageNotFound />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
