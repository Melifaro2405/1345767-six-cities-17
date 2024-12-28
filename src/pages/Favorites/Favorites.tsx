import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer/Footer.tsx';
import OffersFavoriteList from '../../components/OffersFavoriteList/OffersFavoriteList.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions.ts';

function EmptyFavoriteList() {
  return (
    <div className="page page--favorites-empty">
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">FavoritesEmpty (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Favorites() {
  const dispatch = useAppDispatch();

  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const isFavoriteOffersLoading = useAppSelector(
    (state) => state.isFavoriteOffersLoading,
  );

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (isFavoriteOffersLoading) {
    return <Loader />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 городов. Избранное</title>
      </Helmet>
      {favoriteOffers.length ? (
        <OffersFavoriteList favoriteOffers={favoriteOffers} />
      ) : (
        <EmptyFavoriteList />
      )}
      <Footer />
    </div>
  );
}

export default Favorites;
