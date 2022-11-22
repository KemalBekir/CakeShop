import "./Filter.css";
import React from "react";

const Filter = ({active,category,onClick }) => {
  return (
    <li
    onClick={onClick}
      className={active ? 'active' : ''}
    >
      {category}
    </li>
  );
};

export default Filter;
