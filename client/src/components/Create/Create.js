import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as catalogServices from "../../services/catalogServices";
import "./Create.css";

const CreateSchema = Yup.object().shape({
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
        //TODO: Notification success
      } else {
        //TODO: Notification error
        navigate("/catalog");
      }
    });
  };

  return (
    <section className="create-section">
      <h3 className="create-title">Create</h3>
      <Formik
        initialValues={{ ...cake }}
        validationSchema={CreateSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="create-form">
            <label htmlFor="cakeName">Name of Cake:</label>
            <Field
              type="text"
              name="cakeName"
              placeholder="Enter Cake name."
              className="create-name"
            />
            {errors.cakeName && touched.cakeName ? (
              <p className="alert">{errors.cakeName}</p>
            ) : null}
            <label htmlFor="description">Description:</label>
            <Field
              as="textarea"
              type="text"
              name="desc"
              className="create-desc"
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
              className="create-price"
            />
            {errors.price && touched.price ? (
              <p className="alert">{errors.price}</p>
            ) : null}
            <label htmlFor="type">Type:</label>
            <Field
              type="text"
              name="type"
              className="create-type"
              placeholder="Please enter type."
            />
            {errors.type && touched.type ? (
              <p className="alert">{errors.type}</p>
            ) : null}
            <label htmlFor="imgOne">First Image:</label>
            <Field
              type="text"
              name="imgOne"
              placeholder="Link to image of the Cake"
              className="create-image"
            />
            {errors.imgOne && touched.imgOne ? (
              <p className="alert">{errors.imgOne}</p>
            ) : null}
            <label htmlFor="imgTwo">Second Image:</label>
            <Field
              type="text"
              name="imgTwo"
              placeholder="Link to image of the Cake"
              className="create-image"
            />
            {errors.imgTwo && touched.imgTwo ? (
              <p className="alert">{errors.imgTwo}</p>
            ) : null}
            <label htmlFor="imgThree">Third Image:</label>
            <Field
              type="text"
              name="imgThree"
              placeholder="Link to image of the Cake"
              className="create-image"
            />
            {errors.imgThree && touched.imgThree ? (
              <p className="alert">{errors.imgThree}</p>
            ) : null}
            <label htmlFor="imgFour">Fourth Image:</label>
            <Field
              type="text"
              name="imgFour"
              placeholder="Link to image of the Cake"
              className="create-image"
            />
            {errors.imgFour && touched.imgFour ? (
              <p className="alert">{errors.imgFour}</p>
            ) : null}
            <label className="create-offer-label" htmlFor="onOffer">
              On Offer:
              <Field type="checkbox" name="onOffer" className="create-offer" />
            </label>
            <div className="create-btn-wrapper">
              <Link className="create-cancel" to="/catalog">
                Cancel
              </Link>
              <button
                disabled={!(isValid && dirty)}
                type="submit"
                className={!(isValid && dirty) ? "inactive" : "create-btn"}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Create;
