import { useCallback, useEffect, useState } from "react";
import * as catalogService from "../../services/catalogServices";
import CatalogCard from "../CatalogCard/CatalogCard";
import "./Catalog.css";

const Catalog = () => {
  const [cake, setCake] = useState([]);

  const data = useCallback(() => {
    setCake(catalogService.getAll().then((result) => {
        setCake(result);
    }));
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
            {cake.length > 0 ? (
              cake.map((x) => <CatalogCard key={x._id} cake={x} />)
            ) : (
              <h3 style={{ color: "white" }}>No listings currently</h3>
            )}
          {/* </>
        )} */}
      </div>
    </section>
  );
};

export default Catalog;
