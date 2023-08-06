import headerLogo from '../images/logo.svg';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ userEmail, onLogout }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Место Россия" className="header__logo" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link-auth">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link-auth">
              Войти
            </Link>
          }
        />

        <Route
          path="/"
          element={
            <nav className="header__nav">
              <span className="header__email">{userEmail}</span>
              <Link
                className="header__btn-nav"
                to="/sign-in"
                onClick={onLogout}>
                Выйти
              </Link>
            </nav>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
