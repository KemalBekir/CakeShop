import { Link } from "react-router-dom";
import React from "react";
import "./ImageCard.css";

const ImageCard = ({ cake }) => {
  return (
    <Link to={`/catalogue/details/${cake._id}`}>
      <div className="image-card">
        <div className="image-card-container">
          <img className="image" src={cake.imgOne} alt={cake.desc} />
        </div>
        <div className="image-content-container">
          <h3 className="image-title">Price: £{cake.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
