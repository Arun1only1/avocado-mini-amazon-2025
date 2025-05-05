"use client";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProductDialog from "./DeleteProductDialog";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { useParams, useRouter } from "next/navigation";
import { IError } from "@/interface/error.interface";
import AddToCart from "./AddToCart";
import { fallBackProductImage } from "@/constant/general.constant";

interface IProductDetails {
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
  description: string;
  freeShipping: boolean;
}

const ProductDetailSection: React.FC = () => {
  const [userRole, setUserRole] = useState("");
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      setUserRole(window.localStorage.getItem("role") as string);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery<IProductDetails, IError>(
    {
      queryKey: ["product-detail", productId], // More specific key with productId
      queryFn: async () => {
        const response = await axiosInstance.get(
          `/product/detail/${productId}`
        );
        return response.data.productDetails as IProductDetails;
      },
      // Optional: Add error handling or data transformation here
    }
  );

  // Error and loading states
  if (isLoading) return <CircularProgress color="warning" />;
  if (isError) {
    return (
      <Box>
        <Typography color="error">
          Error loading product:
          {error.response.data.message}
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return <Typography>No product details available.</Typography>;
  }

  const {
    name,
    brand,
    category,
    price,
    quantity,
    image,
    description,
    freeShipping,
  } = data;

  return (
    <Box className="flex gap-8 w-[80%] shadow-2xl p-8">
      <Box className="w-[50%] flex justify-center items-center">
        <Image
          className="cursor-pointer hover:opacity-90 transition-opacity duration-300 ease-in-out"
          src={image || fallBackProductImage} // Use dynamic image or fallback
          height={400}
          width={800}
          alt={name || "Product Image"} // Dynamic alt text
          style={{
            objectFit: "contain",
            height: "400px",
            width: "100%",
          }}
        />
      </Box>
      <Box className="flex flex-col items-start gap-4 w-[50%]">
        <Typography variant="h5">{name}</Typography>
        <Chip label={brand} color="secondary" />
        <Typography variant="h6">Price: ${price.toFixed(2)}</Typography>
        <Typography variant="h6">Available Quantity: {quantity}</Typography>
        <Chip className="capitalize" label={category} color="secondary" />
        <FormControlLabel
          control={<Checkbox checked={freeShipping} disabled />}
          label="Free Shipping"
        />
        <Typography className="text-base text-justify">
          {description}
        </Typography>

        {userRole === "seller" && (
          <Box className="w-full flex justify-between gap-8">
            <Button
              fullWidth
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              onClick={() => router.push(`/edit-product/${productId}`)}
            >
              Edit
            </Button>

            <DeleteProductDialog productId={productId} />
          </Box>
        )}

        {userRole === "buyer" && (
          <Box className="w-full flex justify-between gap-8">
            <AddToCart totalQuantity={quantity} productId={productId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetailSection;
