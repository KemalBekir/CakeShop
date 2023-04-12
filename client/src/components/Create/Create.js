import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as catalogServices from "../../services/catalogServices";
import React from "react";
import "./Create.css";
import { toast } from "react-toastify";

const CreateSchema = Yup.object().shape({
  cakeName: Yup.string()
    .min(4, "Cake name must contain atleast 4 charcaters")
    .required("Cake name is required"),
  desc: Yup.string().required("Description is required"),
  price: Yup.number().min(0, "Price must be positive number"),
  type: Yup.string().required("Type of cake is required"),
  imgOne: Yup.string().required("Image is required"),
  imgTwo: Yup.string().required("Image is required"),
  imgThree: Yup.string().required("Image is required"),
  imgFour: Yup.string().required("Image is required"),
  onOffer: Yup.boolean().default(false),
  discount: Yup.number()
    .oneOf([0, 10, 15, 20, 25, 30, 35, 40, 45, 50])
    .default(0),
});

const Create = () => {
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

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const cakeData = values;
    catalogServices.createCake(cakeData, user.accessToken).then((result) => {
      if (result.message) {
        toast.error(result.message);
      } else {
        toast.success(`${cakeData.cakeName} was created successfully`);
        navigate("/catalogue");
      }
    });
  };

  return (
    <>
      <section className="create-section">
        <div className="create-section-container">
          <div className="create-img-container">
            <img
              className="create-img"
              src="https://images.unsplash.com/photo-1606188074044-fcd750f6996a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            />
          </div>
          <div className="create-form-container">
            <h3 className="create-title">Create</h3>
            <Formik
              initialValues={{ ...cake, onOffer: false }}
              validationSchema={CreateSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, isValid, dirty }) => (
                <Form className="create-form">
                  <label htmlFor="cakeName">Name of Cake:</label>
                  <Field
                    type="text"
                    name="cakeName"
                    placeholder={
                      errors.cakeName && touched.cakeName
                        ? errors.cakeName
                        : "Enter name for Cake"
                    }
                    className={
                      errors.cakeName && touched.cakeName
                        ? "create-name-alert"
                        : "create-name"
                    }
                  />
                  <label htmlFor="description">Description:</label>
                  <Field
                    as="textarea"
                    type="text"
                    name="desc"
                    className={
                      errors.desc && touched.desc
                        ? "create-desc-alert"
                        : "create-desc"
                    }
                    placeholder={
                      errors.desc && touched.desc
                        ? errors.desc
                        : "Please enter description"
                    }
                  />
                  <label htmlFor="price">Price:</label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Price of your Cake"
                    className="create-price"
                  />
                  {errors.price && touched.price ? (
                    <p className="alert">{errors.price}</p>
                  ) : null}
                  <label htmlFor="type">Type:</label>
                  <Field
                    type="text"
                    name="type"
                    className={
                      errors.type && touched.type
                        ? "create-type-alert"
                        : "create-type"
                    }
                    placeholder={
                      errors.type && touched.type
                        ? errors.type
                        : "Please enter type."
                    }
                  />
                  <label htmlFor="imgOne">First Image:</label>
                  <Field
                    type="text"
                    name="imgOne"
                    placeholder={
                      errors.imgOne && touched.imgOne
                        ? errors.imgOne
                        : "Link to image of the first Cake"
                    }
                    className={
                      errors.imgOne && touched.imgOne
                        ? "create-img-alert"
                        : "create-image"
                    }
                  />
                  <label htmlFor="imgTwo">Second Image:</label>
                  <Field
                    type="text"
                    name="imgTwo"
                    placeholder={
                      errors.imgTwo && touched.imgTwo
                        ? errors.imgTwo
                        : "Link to image of the second Cake"
                    }
                    className={
                      errors.imgTwo && touched.imgTwo
                        ? "create-img-alert"
                        : "create-image"
                    }
                  />
                  <label htmlFor="imgThree">Third Image:</label>
                  <Field
                    type="text"
                    name="imgThree"
                    placeholder={
                      errors.imgThree && touched.imgThree
                        ? errors.imgThree
                        : "Link to image of the third Cake"
                    }
                    className={
                      errors.imgThree && touched.imgThree
                        ? "create-img-alert"
                        : "create-image"
                    }
                  />

                  <label htmlFor="imgFour">Fourth Image:</label>
                  <Field
                    type="text"
                    name="imgFour"
                    placeholder={
                      errors.imgFour && touched.imgFour
                        ? errors.imgFour
                        : "Link to image of the fourth Cake"
                    }
                    className={
                      errors.imgFour && touched.imgFour
                        ? "create-img-alert"
                        : "create-image"
                    }
                  />
                  <label className="create-offer-label" htmlFor="onOffer">
                    On Offer:
                    <Field
                      type="checkbox"
                      name="onOffer"
                      className="create-offer"
                    />
                  </label>
                  <div className="create-btn-wrapper">
                    <Link className="create-cancel" to="/catalog">
                      Cancel
                    </Link>
                    <button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      className={
                        !(isValid && dirty) ? "inactive" : "create-btn"
                      }
                    >
                      Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Create;
