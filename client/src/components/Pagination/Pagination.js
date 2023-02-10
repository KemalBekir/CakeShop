import {  motion } from "framer-motion";
import "./Pagination.css";

import React from "react";

const Pagination = ({ cakesPerPage, totalCakes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCakes / cakesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      Layout
      className="pagination-container"
    >
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Pagination;
