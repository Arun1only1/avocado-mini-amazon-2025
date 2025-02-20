"use client";
import { productCategoriesForDropDown } from "@/constant/general.constant";
import { productSchema } from "@/validation-schema/product.schema";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import { IAddProductForm, IProductData } from "./AddProductForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { useParams, useRouter } from "next/navigation";
import { IProductDetailResponse } from "@/interface/product.detail.response.interface";
import { IError } from "@/interface/error.interface";
import toast from "react-hot-toast";
import { IEditProductResponse } from "@/interface/edit.product.response.interface";

const EditProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  // fetch product details
  const { isPending, data, isError, error } = useQuery<
    IProductDetailResponse,
    IError
  >({
    queryKey: ["product-details"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/product/detail/${productId}`);
      return response.data?.productDetails;
    },
  });

  const { isPending: editPending, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values: IProductData) => {
      return await axiosInstance.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (res: IEditProductResponse) => {
      toast.success(res.data.message);
      router.push(`/product-detail/${productId}`);
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  if (isPending || editPending) {
    return <CircularProgress />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: data?.name || "",
        brand: data?.brand || "",
        price: data?.price || 0,
        quantity: data?.quantity || 1,
        category: data?.category || "",
        freeShipping: String(data?.freeShipping) || "",
        description: data?.description || "",
      }}
      validationSchema={productSchema}
      onSubmit={(values: IAddProductForm) => {
        // we need to convert freeShipping from string to boolean

        const newValues = {
          ...values,
          freeShipping: values.freeShipping === "true",
        };

        mutate(newValues);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-8 shadow-2xl rounded p-4 min-w-[450px] justify-center items-center"
          >
            <Typography variant="h5" className="text-gray-600">
              Edit Product
            </Typography>

            <FormControl fullWidth>
              <TextField label="Name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.name}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField label="Brand" {...formik.getFieldProps("brand")} />
              {formik.touched.brand && formik.errors.brand ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.brand}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="number"
                label="Price"
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.price}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="number"
                label="Quantity"
                {...formik.getFieldProps("quantity")}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.quantity}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...formik.getFieldProps("category")}>
                {productCategoriesForDropDown.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>

              {formik.touched.category && formik.errors.category ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.category}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <FormLabel>Free Shipping</FormLabel>
              <RadioGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
                defaultValue={"false"}
                {...formik.getFieldProps("freeShipping")}
              >
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  value={"true"}
                  label="Yes"
                />
                <FormControlLabel
                  value={"false"}
                  control={<Radio color="secondary" />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Description"
                multiline
                minRows={4}
                maxRows={8}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText className="text-base" error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-orange-400 text-base"
            >
              submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditProductForm;
