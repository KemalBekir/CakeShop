import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import * as CatalogServices from "../../services/catalogServices";
import { toast } from "react-toastify";
import React from "react";
import "./Details.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import ChatPopup from "../ChatPopUp/ChatPopUp";
import Modal from "../Modal/Modal";

const Details = () => {
  const [cake, setCake] = useState({});
  const { user } = useContext(AuthContext);
  const { cakeId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isLogged = user ? true : false;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deleteHandler = () => {
    CatalogServices.deleteCake(cakeId, user.accessToken);
    navigate("/catalogue");
    toast.success(`${cake.cakeName} successfully deleted`);
  };

  useEffect(() => {
    CatalogServices.getCakeById(cakeId).then((result) => {
      if (user._id === result.owner._id) {
        setIsOwner(true);
      }
      setCake(result);
    });
  }, [cakeId,user._id]);

  return (
    <section className="details-section">
      {/* {isLoading ? ( */}
      {/* <Spinner /> */}
      {/* ) : ( */}
      <div className="details-container">
        <div className="details-img-container">
          <ImageSlider cakes={cake} parentWidth={610} className="slider" />
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
                {cake.type?.substring(0, 1).toUpperCase() +
                  cake.type?.substring(1)}
              </p>
            </li>
          </ul>
          <div className="details-btn-wrapper">
            {isOwner && (
              <>
                <Link
                  className="details-btn-edit"
                  to={`/catalogue/details/${cake._id}/edit`}
                >
                  Edit
                </Link>
                <button
                  onClick={handleOpenModal}
                  className="details-btn-delete"
                >
                  Delete
                </button>
                {showModal && (
                  <Modal>
                    <p>Are you sure you want to delete this item?</p>
                    <div className="modal-buttons">
                      <button onClick={deleteHandler}>Yes</button>
                      <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                  </Modal>
                )}
              </>
            )}
          </div>
        </div>
        {isLogged && !isOwner ? <ChatPopup cake={cake} /> : ""}
      </div>
      {/* //   )} */}
    </section>
  );
};

export default Details;
