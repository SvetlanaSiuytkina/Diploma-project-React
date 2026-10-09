import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// шапка сайта 
const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // первый клик отк строку поиска
    if (!searchVisible) {
      setSearchVisible(true);
      return;
    }

    // второй клик если есть текст, переход в каталог
    if (searchValue.trim()) {
      navigate(`/catalog.html?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchVisible(false);
      setSearchValue('');
    } else {
      setSearchVisible(false);
    }
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/catalog.html">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about.html">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts.html">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchClick}
                  />
                  <Link to="/cart.html" className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu" />
                  </Link>
                </div>
                <form
                  className={`header-controls-search-form form-inline ${searchVisible ? '' : 'invisible'}`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;