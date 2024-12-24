import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import CityTabs from '../../components/CityTabs/CityTabs.tsx';
import CityWithoutOffers from '../../components/CityWithoutOffers/CityWithoutOffers.tsx';
import CityWithOffers from '../../components/CityWithOffers/CityWithOffers.tsx';
import { useAppSelector } from '../../hooks';
import { getSortedOffers } from '../../utils/getSortedOffers.ts';

function Main() {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffers = getSortedOffers(offers, sortType, city);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов. Главная</title>
      </Helmet>
      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': !sortedOffers?.length,
        })}
      >
        <CityTabs />
        <div className="cities">
          {sortedOffers?.length ? (
            <CityWithOffers offers={sortedOffers} />
          ) : (
            <CityWithoutOffers />
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
