import { Link } from "react-router-dom";
import React from "react";
import "./ImageCard.css";
import ImageSlider from "../ImageSlider/ImageSlider";

const ImageCard = ({ cake }) => {
  return (
    <div className="image-card">
      <div className="image-card-container">
        <ImageSlider cakes={cake} />
        {/* <img className="image" src={cake.imgOne} alt={cake.desc} /> */}
      </div>
      <Link
        to={`/catalogue/details/${cake._id}`}
        style={{ textDecoration: "none", cursor: "pointer", width: '100%' }}
      >
        <div className="image-content-container">
          <h3 className="image-title">Price: £{cake.price}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
