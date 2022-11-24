import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Moment from "react-moment";
import "./CatalogCard.css";
import React from "react";

const CatalogCard = ({ cake }) => {
  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{duration: 0.5}}
        Layout
        className="catalog-card-container"
      >
        <div className="catalog-img-container">
          <img className="catalog-card-img" src={cake.imgOne} alt="" />
        </div>
        <div className="catalog-card">
          <h5 className="catalog-card-title">
            {cake.cakeName.length > 16
              ? `${cake.cakeName.substring(0, 16)}`
              : cake.cakeName}
          </h5>
          {/* <p className="catalog-card-desc">
            {cake.desc.length > 15
              ? cake.desc.substring(0, 10)
              : cake.desc}
          </p> */}
          {/* <p className="catalog-card-date">
            <Moment format="MMMM Do YY, h:mm a">{cake.updatedAt}</Moment>
          </p> */}
        </div>
        <Link
          className="catalog-card-link"
          to={`/catalogue/details/${cake._id}`}
        >
          Details
        </Link>
      </motion.div>
    </>
  );
};

export default CatalogCard;
