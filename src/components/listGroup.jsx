import React from "react";

const ListGroup = props => {
  const {
    items,
    onItemSelect,
    selectedItem,
    textProperty,
    valueProperty
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group__item active-class"
              : "list-group__item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};

export default ListGroup;
