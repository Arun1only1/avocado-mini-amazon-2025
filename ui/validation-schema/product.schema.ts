import { productCategories } from "@/constant/general.constant";
import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required.")
    .trim()
    .max(255, "Product name must be at most 255 characters."),

  brand: yup
    .string()
    .required("Brand is required.")
    .trim()
    .max(255, "Brand name must be at most 255 characters."),

  price: yup
    .number()
    .min(0, "Price should be a positive number.")
    .required("Price is required."),

  quantity: yup
    .number()
    .typeError("Quantity must be a number.")
    .min(1, "Quantity must be at least 1.")
    .integer("Quantity must be an integer.")
    .required("Quantity is required."),

  category: yup
    .string()
    .required("Category is required.")
    .trim()
    .oneOf(productCategories, "Invalid category selected."),

  freeShipping: yup.boolean().default(false),

  description: yup
    .string()
    .required("Description is required.")
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(1000, "Description must be at most 1000 characters."),
});
