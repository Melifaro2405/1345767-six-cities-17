import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, CityTypes, SortTypes } from '../../const.ts';
import { changeCity, changeSortType } from '../../store/action.ts';

function CityTabs() {
  const dispatch = useAppDispatch();

  const activeCity = useAppSelector((state) => state.city);

  const handleClickTab = (value: CityTypes) => {
    dispatch(changeCity(value));
    dispatch(changeSortType(SortTypes.Popular));
  };

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.values(CityTypes).map((item) => (
              <li key={item} className="locations__item">
                <Link
                  to={AppRoute.Root}
                  onClick={() => handleClickTab(item)}
                  className={classNames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': activeCity === item,
                  })}
                >
                  <span>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CityTabs;
