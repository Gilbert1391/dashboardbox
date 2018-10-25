import React from "react";
import ListGroup from "./listGroup";

const SideBar = props => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="side-nav__item side-nav__item--active">
          <span className="side-nav__span">Popularity</span>
        </li>
        <li className="side-nav__item">
          <span className="side-nav__span">Release date</span>
        </li>
        <ListGroup
          onItemSelect={onItemSelect}
          items={items}
          selectedItem={selectedItem}
        />
      </ul>
    </nav>
  );
};

export default SideBar;
