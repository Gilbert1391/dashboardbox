import React from "react";
import moviedbLogo from "../img/moviedb.png";

const SideBar = props => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <nav className="sidebar">
      <ul className="side-nav">
        {items.map(item => (
          <li
            key={item.id}
            className={
              item === selectedItem
                ? "side-nav__item side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => onItemSelect(item)}
          >
            <span className="side-nav__span">{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="footer">
        <a
          href="https://www.themoviedb.org/"
          target="_blanck"
          className="footer__logo"
        >
          <img
            src={moviedbLogo}
            alt="Powered by the movie database"
            className="footer__logo-img"
          />
        </a>
        <div className="legal">
          &copy; 2018 by{" "}
          <a
            href="https://gilbertrosario.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Gilbert Rosario.
          </a>{" "}
          All rights reserved. View on{" "}
          <a
            href="https://github.com/Gilbert1391/Movie-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub.
          </a>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
