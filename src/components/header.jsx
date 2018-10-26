import React from "react";

const Header = ({ value, onSearch }) => {
  return (
    <header className="header">
      <span className="header__logo-name">Dashbord Box</span>
      <form className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search movies..."
          value={value}
          onChange={e => onSearch(e.currentTarget.value)}
        />
        <button disabled className="search__button">
          <i className="search__icon fa fa-search" />
        </button>
      </form>
    </header>
  );
};

export default Header;
