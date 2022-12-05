import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as catalogServices from "../../services/catalogServices";
import "./Edit.css";

import React from "react";

const EditSchema = Yup.object().shape({
  cakeName: Yup.string()
    .min(4, "Cake name must contain atleast 4 charcaters")
    .required("Cake name is required"),
  desc: Yup.string().required("Description is required"),
  price: Yup.number().min(0, "Price must be positive number"),
  type: Yup.string().required("Type of cake is required"),
  imgOne: Yup.string().required("Image is required"),
  imgTwo: Yup.string().required("image is required"),
  imgThree: Yup.string().required("image is required"),
  imgFour: Yup.string().required("image is required"),
  onOffer: Yup.boolean().default(false),
  discount: Yup.number()
    .oneOf([0, 10, 15, 20, 25, 30, 35, 40, 45, 50])
    .default(0),
});

const Edit = () => {
  const { cakeId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cake, setCake] = useState({
    cakeName: "",
    desc: "",
    price: 0,
    type: "",
    imgOne: "",
    imgTwo: "",
    imgThree: "",
    imgFour: "",
    onOffer: "false",
    discount: 0,
  });

  useEffect(() => {
    catalogServices.getCakeById(cakeId).then((result) => {
      setCake(result);
    });
  }, []);

  const onSubmit = (values) => {
    const cakeData = values;
    catalogServices
      .editCake(cakeId, cakeData, user.accessToken)
      .then((result) => {
        if (result.message) {
          //TODO: Notification success
          console.log(result.message);
        } else {
          //TODO: Notification error
          navigate(`/catalogue/details/${cakeId}`);
        }
      });
  };

  return (
    <section className="edit-section">
      <div className="edit-section-container">
        <div className="edit-img-container">
          <img
            className="edit-img"
            src="https://images.unsplash.com/photo-1606188074044-fcd750f6996a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          />
        </div>
        <div className="edit-form-container">
          <h3 className="edit-title">Edit</h3>
          <Formik
            initialValues={{
              cakeName: cake.cakeName || "",
              desc: cake.desc || "",
              price: cake.price || 0,
              type: cake.type || "",
              imgOne: cake.imgOne || "",
              imgTwo: cake.imgTwo || "",
              imgThree: cake.imgThree || "",
              imgFour: cake.imgFour || "",
              onOffer: cake.onOffer ,
              discount: 0,
            }}
            validationSchema={EditSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, isValid, dirty }) => (
              <Form className="edit-form">
                <label htmlFor="cakeName">Name of Cake:</label>
                <Field
                  type="text"
                  name="cakeName"
                  placeholder="Enter Cake name."
                  className="edit-name"
                />
                {errors.cakeName && touched.cakeName ? (
                  <p className="alert">{errors.cakeName}</p>
                ) : null}
                <label htmlFor="description">Description:</label>
                <Field
                  as="textarea"
                  type="text"
                  name="desc"
                  className="edit-desc"
                  placeholder="Please enter description"
                />
                {errors.desc && touched.desc ? (
                  <p className="alert">{errors.desc}</p>
                ) : null}
                <label htmlFor="price">Price:</label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Price of your Cake"
                  className="edit-price"
                />
                {errors.price && touched.price ? (
                  <p className="alert">{errors.price}</p>
                ) : null}
                <label htmlFor="type">Type:</label>
                <Field
                  type="text"
                  name="type"
                  className="edit-type"
                  placeholder="Please enter type."
                />
                {errors.type && touched.type ? (
                  <p className="alert">{errors.type}</p>
                ) : null}
                <label htmlFor="imgOne">First Image:</label>
                <Field
                  type="text"
                  name="imgOne"
                  placeholder="Link to image of the first Cake"
                  className="edit-image"
                />
                {errors.imgOne && touched.imgOne ? (
                  <p className="alert">{errors.imgOne}</p>
                ) : null}
                <label htmlFor="imgTwo">Second Image:</label>
                <Field
                  type="text"
                  name="imgTwo"
                  placeholder="Link to image of the second Cake"
                  className="edit-image"
                />
                {errors.imgTwo && touched.imgTwo ? (
                  <p className="alert">{errors.imgTwo}</p>
                ) : null}
                <label htmlFor="imgThree">Third Image:</label>
                <Field
                  type="text"
                  name="imgThree"
                  placeholder="Link to image of the third Cake"
                  className="edit-image"
                />
                {errors.imgThree && touched.imgThree ? (
                  <p className="alert">{errors.imgThree}</p>
                ) : null}
                <label htmlFor="imgFour">Fourth Image:</label>
                <Field
                  type="text"
                  name="imgFour"
                  placeholder="Link to image of the fourth Cake"
                  className="edit-image"
                />
                {errors.imgFour && touched.imgFour ? (
                  <p className="alert">{errors.imgFour}</p>
                ) : null}
                <label className="edit-offer-label" htmlFor="onOffer">
                  On Offer:
                  <Field
                    type="checkbox"
                    name="onOffer"
                    className="edit-offer"
                  />
                </label>
                <div className="edit-btn-wrapper">
                  <Link className="edit-cancel" to="/catalog">
                    Cancel
                  </Link>
                  <button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    className={!(isValid && dirty) ? "inactive" : "edit-btn"}
                  >
                    Edit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Edit;
