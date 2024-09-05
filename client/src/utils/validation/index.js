import {
  loginInitialValues,
  loginValidationSchema,
  registerInitialValues,
  registerValidationSchema,
} from "./authValidation";

const INITIALVALUES = {
  loginInitialValues: loginInitialValues,
  registerInitialValues: registerInitialValues,
};

const VALIDATIONS = {
  loginValidationSchema: loginValidationSchema,
  registerValidationSchema: registerValidationSchema,
};

export { VALIDATIONS, INITIALVALUES };
