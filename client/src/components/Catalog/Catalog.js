import { useCallback, useEffect, useState } from "react";
import * as catalogService from "../../services/catalogServices";
import CatalogCard from "../CatalogCard/CatalogCard";
import "./Catalog.css";
import React from "react";

const Catalog = () => {
  const [cake, setCake] = useState([]);
  let categories = [];

  if (cake.length > 0) {
    const result = cake.map((item) => item.type);
    categories = [
      "All",
      ...result.filter((item, i) => {
        return result.indexOf(item) === i;
      }),
    ];
    console.log(categories);
  }

  const data = useCallback(() => {
    setCake(
      catalogService.getAll().then((result) => {
        setCake(result);
      })
    );
  }, []);

  useEffect(() => {
    data();
  }, [data]);

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
            {categories.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
        <div className="catalog-content">
          {cake.length > 0 ? (
            cake.map((x) => <CatalogCard key={x._id} cake={x} />)
          ) : (
            <h3 style={{ color: "white" }}>No listings currently</h3>
          )}
        </div>
        {/* </>
        )} */}
      </div>
    </section>
  );
};

export default Catalog;
