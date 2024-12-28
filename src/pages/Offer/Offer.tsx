import { Helmet } from 'react-helmet-async';
import OfferById from '../../components/OfferById/OfferById.tsx';
import OffersList from '../../components/OffersList/OffersList.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/Loader/Loader.tsx';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  fetchOfferByIdAction,
  fetchOfferCommentsAction,
  fetchOffersNearbyAction,
} from '../../store/api-actions.ts';
import { loadOfferById } from '../../store/action.ts';
import { TOfferById } from '../../types/offers.ts';

function Offer() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const offerById = useAppSelector((state) => state.offerById);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const isOfferByIdLoading = useAppSelector(
    (state) => state.isOfferByIdLoading,
  );
  const isOffersNearbyLoading = useAppSelector(
    (state) => state.isOffersNearbyLoading,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchOffersNearbyAction(id));
      dispatch(fetchOfferCommentsAction(id));
    }

    return () => {
      dispatch(loadOfferById({} as TOfferById));
    };
  }, [dispatch, id]);

  if (!offerById?.id || isOfferByIdLoading || isOffersNearbyLoading) {
    return <Loader />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 городов. Предложение</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <div className="container">
          <OfferById offerById={offerById} offersNearby={offersNearby} />
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList offers={offersNearby} isNearby />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
