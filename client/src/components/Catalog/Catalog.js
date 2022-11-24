import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "../Filter/Filter";
import * as catalogService from "../../services/catalogServices";
import CatalogCard from "../CatalogCard/CatalogCard";
import "./Catalog.css";
import React from "react";

const Catalog = () => {
  const [cake, setCake] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState("All");
  const [isActive, setIsActive] = useState(false);

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

  // const filterByType = (e) => {
  //   selected = e.target.textContent;
  //   if (!e.currentTarget.classList.contains("active")) {
  //     if (e.currentTarget.textContent === selected) {
  //       e.currentTarget.classList.add("active");
  //       return;
  //     }
  //     e.currentTarget.classList.add("active");
  //     setIsActive(true);
  //   }

  //   //e.currentTarget.classList.toggle('active');
  //   setActiveType(selected);
  // };
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
