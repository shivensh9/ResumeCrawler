import * as Yup from "yup";

// initialValues
const loginInitialValues = {
  email: "",
  password: "",
};

const registerInitialValues = {
  email: "",
  password: "",
  name: "",
  companyName: "",
};

// validation schema
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email*"),
  password: Yup.string().min(6).max(15).required("Please enter your Password*"),
});

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email*"),
  password: Yup.string().min(6).max(15).required("Please enter your Password*"),
  name: Yup.string().required("Please enter your Name*"),
  companyName: Yup.string().required("Please enter your Company name*"),
});

export {
  loginInitialValues,
  registerInitialValues,
  loginValidationSchema,
  registerValidationSchema,
};
