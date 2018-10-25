import React from "react";

const Header = () => {
  return (
    <header className="header">
      <span className="header__logo-name">Dashbord Box</span>
      <form className="search">
        <input className="search__input" type="text" placeholder="Search" />
        <button className="search__button">
          <i className="search__icon fa fa-search" />
        </button>
      </form>
    </header>
  );
};

export default Header;
