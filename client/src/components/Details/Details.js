import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import * as CatalogServices from "../../services/catalogServices";
import React from "react";
import "./Details.css";
import ImageSlider from "../ImageSlider/ImageSlider";

const Details = () => {
  const [cake, setCake] = useState({});
  const { user } = useContext(AuthContext);
  const { cakeId } = useParams();
  const navigate = useNavigate();
  const deleteHandler = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete this item ${cake.cakeName}`
    );
    if (confirm) {
      CatalogServices.deleteCake(cakeId, user.accessToken);
      navigate("/catalogue");
      //TODO: Notification for success
    } else {
      navigate(`/catalogue/details/${cakeId}`);
    }
  };

  useEffect(() => {
    CatalogServices.getCakeById(cakeId).then((result) => {
      setCake(result);
    });
  }, [cakeId]);
  return (
    <section className="details-section">
      {/* {isLoading ? ( */}
      {/* <Spinner /> */}
      {/* ) : ( */}
      <div className="details-container">
        <div className="details-img-container">
          <ImageSlider cakes={cake} />
          {/* <img className="details-img" src={cake.imgOne} alt={cake.desc}></img> */}
        </div>
        <div className="details-info-container">
          <h2 className="details-title">{cake.cakeName}</h2>
          <ul className="details-info-list">
            <li className="details-info-cake">
              <span className="details-info-accent">Description: </span>
              <p>{cake.desc}</p>
            </li>
            <li className="details-info-cake">
              <p>
                <span className="details-info-accent">Price: </span>
                {`£${cake.price}`}
              </p>
            </li>
            <li className="details-info-cake">
              <p>
                <span className="details-info-accent">Type: </span>
                {cake.type}
              </p>
            </li>
          </ul>
          <div className="details-btn-wrapper">
            <Link className="details-btn-edit" to={`/details/${cake._id}/edit`}>
              Edit
            </Link>
            <button onClick={deleteHandler} className="details-btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* //   )} */}
    </section>
  );
};

export default Details;
