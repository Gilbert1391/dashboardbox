import React from "react";

const PhoneNav = ({ items, onItemSelect, selectedItem }) => {
  return (
    <nav className="phone-nav">
      <ul className="phone-navigation">
        {items.map(item => (
          <li
            key={item.id}
            className="phone-navigation__item"
            onClick={() => onItemSelect(item)}
          >
            <a
              className={
                item === selectedItem
                  ? "phone-navigation__link phone-navigation__link--active"
                  : "phone-navigation__link"
              }
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PhoneNav;
