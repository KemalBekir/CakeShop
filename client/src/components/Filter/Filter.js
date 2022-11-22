import "./Filter.css";
import React from "react";

const Filter = ({active,category,onClick }) => {
  return (
    <li
    onClick={onClick}
      className={active ? 'catalog-category-item active' : 'catalog-category-item'}
    >
      {category.toUpperCase()}
    </li>
  );
};

export default Filter;
