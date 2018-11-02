import React from "react";
import Dropdown from "./dropdown";

const Header = ({ value, onSearch, onValueSelect, sortValue }) => {
  return (
    <header className="header">
      <span className="header__logo-name">Dashboard Box</span>
      <span className="header__logo-phone">- Box</span>
      <form className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search Movies..."
          value={value}
          onChange={e => onSearch(e.currentTarget.value)}
        />
        <button disabled className="search__button">
          <i className="search__icon fa fa-search" />
        </button>
      </form>
      <Dropdown sortValue={sortValue} onValueSelect={onValueSelect} />
    </header>
  );
};

export default Header;
