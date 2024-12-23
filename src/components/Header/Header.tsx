import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions.ts';
import { getStorageUserData } from '../../services/auth-user-data.ts';

function Header() {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.authStatus);
  const offers = useAppSelector((state) => state.offers);

  const favoriteOffersCount =
    offers?.filter(({ isFavorite }) => isFavorite)?.length || 0;

  const isAuthorized = authStatus === AuthStatus.Auth;

  const handleLoginLogout = () => {
    if (isAuthorized) {
      dispatch(logoutAction());
    }
  };

  const userData = getStorageUserData();

  const avatarStyle = isAuthorized
    ? { backgroundImage: `url(${userData?.avatarUrl})`, borderRadius: '50%' }
    : undefined;

  const avatarWrapperClass = 'header__avatar-wrapper user__avatar-wrapper';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to="/"
              className="header__logo-link header__logo-link--active"
              style={{ cursor: 'pointer' }}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Favorites}
                >
                  <div className={avatarWrapperClass} style={avatarStyle}></div>
                  {isAuthorized && (
                    <>
                      <span className="header__user-name user__name">
                        {userData?.email}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteOffersCount}
                      </span>
                    </>
                  )}
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.Login}>
                  <span className="header__signout" onClick={handleLoginLogout}>
                    {isAuthorized ? 'Sign out' : 'Sign in'}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
