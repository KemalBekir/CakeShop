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

const Create = () => {};

export default Create;
