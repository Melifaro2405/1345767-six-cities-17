import { Helmet } from 'react-helmet-async';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TAuthData } from '../../types/auth-data.ts';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions.ts';
import {
  validateEmail,
  validatePassword,
} from '../../utils/fields-validation.ts';

const initialAuthData: TAuthData = {
  email: '',
  password: '',
};

function Login() {
  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState<TAuthData>(initialAuthData);

  const handleChangeAuthData = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(authData));
  };

  const isValidAuthData =
    validateEmail(authData.email) && validatePassword(authData.password);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 городов. Авторизация</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={handleSubmit}
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  value={authData.email}
                  onChange={handleChangeAuthData}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  value={authData.password}
                  onChange={handleChangeAuthData}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValidAuthData}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
