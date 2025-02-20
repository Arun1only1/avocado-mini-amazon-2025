"use client";
import { productCategoriesForDropDown } from "@/constant/general.constant";
import { IAddProductResponse } from "@/interface/add.product.interface";
import { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import { productSchema } from "@/validation-schema/product.schema";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export interface IProductRoot {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
}
export interface IAddProductForm extends IProductRoot {
  freeShipping: string;
}

export interface IProductData extends IProductRoot {
  freeShipping: boolean;
}

const AddProductForm = () => {
  const router = useRouter();
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values: IProductData) => {
      return await axiosInstance.post("/product/add", values);
    },
    onSuccess: (res: IAddProductResponse) => {
      toast.success(res.data.message);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Box>
      {isPending && <LinearProgress color="warning" />}
      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: 0,
          quantity: 1,
          category: "",
          freeShipping: "false",
          description: "",
        }}
        validationSchema={productSchema}
        onSubmit={(values: IAddProductForm) => {
          // we need to convert freeShipping from string to boolean

          const newProduct = {
            ...values,
            freeShipping: values.freeShipping === "true",
          };

          mutate(newProduct);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 shadow-2xl rounded p-4 min-w-[450px] justify-center items-center"
            >
              <Typography variant="h5" className="text-gray-600">
                Add Product
              </Typography>

              {localUrl && (
                <Image
                  src={localUrl}
                  alt="Product Image"
                  height={250}
                  width={250}
                  style={{
                    objectFit: "contain",
                    height: "250px",
                    width: "100%",
                  }}
                />
              )}

              <input
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(event.target.files);

                  if (!event || !event.target || !event.target.files) {
                    return;
                  }
                  const image = event.target.files[0];
                  const imageLocalUrl = URL.createObjectURL(image);
                  setLocalUrl(imageLocalUrl);
                }}
              />

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
                disabled={isPending}
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddProductForm;
