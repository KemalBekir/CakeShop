import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "../Filter/Filter";
import * as catalogService from "../../services/catalogServices";
import CatalogCard from "../CatalogCard/CatalogCard";
import "./Catalog.css";
import React from "react";
import Pagination from "../Pagination/Pagination";

const Catalog = () => {
  const [cake, setCake] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cakesPerPage] = useState(12);

  let categories = [];
  let selected = "";

  if (cake.length > 0) {
    const result = cake.map((item) => item.type);
    categories = [
      "All",
      ...result.filter((item, i) => {
        return result.indexOf(item) === i;
      }),
    ];
  }

  const data = useCallback(() => {
    setCake(
      catalogService.getAll().then((result) => {
        setCake(result);
        setFiltered(result);
      })
    );
  }, []);

  useEffect(() => {
    if (activeType === "All") {
      setFiltered(cake);
      return;
    }
    const filtered = cake.filter((c) => c.type === activeType);

    setFiltered(filtered);
  }, [activeType]);

  useEffect(() => {
    data();
  }, []);

  const indexOfLastCake = currentPage * cakesPerPage;
  const indexOfFirstCake = indexOfLastCake - cakesPerPage;
  const currentCake = filtered.slice(indexOfFirstCake, indexOfLastCake);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="catalog-section">
      <div className="catalog-container">
        {/* {isLoading ? (
          <Spinner />
        ) : (
          <> */}
        <h2 className="catalog-title">All listings</h2>
        <div className="catalog-left-side">
          <h3 className="catalog-categories">Categories:</h3>
          <ul className="catalog-category-list">
            {categories.map((x, i) => (
              <Filter
                key={i}
                category={x}
                active={x === activeType}
                onClick={() => setActiveType(x)}
              />
            ))}
          </ul>
        </div>
        <motion.div Layout className="catalog-content">
          {/* {filtered.length > 0 ? ( */}
          <AnimatePresence>
            {/* {" "} */}
            {filtered.map((x) => (
              <CatalogCard key={x._id} cake={x} />
            ))}
            {filtered.length > cakesPerPage ? (
              <Pagination
                cakesPerPage={cakesPerPage}
                totalCakes={filtered.length}
                paginate={paginate}
              />
            ) : (
              ""
            )}
          </AnimatePresence>
          {/* ) : ( */}
          {/* <h3 style={{ color: "white" }}>No listings currently</h3> */}
          {/* )} */}
        </motion.div>
        {/* </>
        )} */}
      </div>
    </section>
  );
};

export default Catalog;
