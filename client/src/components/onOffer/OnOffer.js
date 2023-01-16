import { useState, useEffect, useCallback } from "react";
import * as CatalogService from "../../services/catalogServices";
import "./OnOffer.css";
import React from "react";
import ImageCard from "../ImageCard/ImageCard";

const OnOffer = () => {
  const [cakes, setCakes] = useState([]);

  const data = useCallback(() => {
    CatalogService.getCakesOnOffer().then((result) => {
      setCakes(result);
    });
  }, []);

  useEffect(() => {
    data();
  });

  return (
    <section className="offer-section">
      <div className="offer-section-container">
        {/* {cakes.length > 0 ? ( */}
        <>
          <div className="offer-section-title">
            <h2 className="offer-title">Our current deals</h2>
          </div>
          <div className="offer-list-container">
            {cakes.map((x) => (
              <ImageCard key={x._id} cake={x} />
            ))}
          </div>
        </>
        {/* ) : null} */}
      </div>
    </section>
  );
};

export default OnOffer;
