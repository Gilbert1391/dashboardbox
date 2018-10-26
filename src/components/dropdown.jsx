import React from "react";

const Dropdown = ({ sortValue, onValueSelect }) => {
  // const values = [
  //   { id: 1, name: "Popularity" },
  //   { id: 2, name: "Top Rated" },
  //   { id: 3, name: "Now Playing" }
  // ];

  return (
    <div className="dropdown">
      <input
        type="submit"
        id="dropdown-input"
        className="dropdown__input"
        value={sortValue}
      />
      <ul className="dropdown__content">
        <li
          className="dropdown__item"
          onClick={e => onValueSelect(e.currentTarget.textContent)}
        >
          Popularity
        </li>
        <li
          className="dropdown__item"
          onClick={e => onValueSelect(e.currentTarget.textContent)}
        >
          Top Rated
        </li>
        <li
          className="dropdown__item"
          onClick={e => onValueSelect(e.currentTarget.textContent)}
        >
          Now Playing
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
