import React from "react";

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
    </nav>
  );
};

export default SideBar;
