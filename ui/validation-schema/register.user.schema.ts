import * as yup from "yup";
import dayjs from "dayjs";

export const registerUserSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is a required.")
    .trim()
    .lowercase()
    .max(100, "Email must not exceed 100 characters."),

  password: yup
    .string()
    .required("Password is a required.")
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must not exceed 30 characters."),

  firstName: yup
    .string()
    .required("First name is required.")
    .trim()
    .max(100, "First name must not exceed 100 characters."),

  lastName: yup
    .string()
    .required("Last name is required.")
    .trim()
    .max(100, "Last name must not exceed 100 characters."),

  dob: yup
    .date()
    .max(dayjs(), "Date of birth must not be a future date.")
    .nullable()
    .notRequired(),

  gender: yup
    .string()
    .required("Please select a gender.")
    .trim()
    .oneOf(
      ["male", "female", "other"],
      "Invalid gender option. Choose from male, female, or other."
    ),

  role: yup
    .string()
    .required("Please select a role.")
    .trim()
    .oneOf(
      ["seller", "buyer"],
      "Invalid role option. Choose from seller or buyer."
    ),

  address: yup
    .string()
    .required("Address is required.")
    .trim()
    .max(255, "Address must not exceed 255 characters."),
});
