"use client";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IProductCard } from "./SellerCardContainer";
import { useRouter } from "next/navigation";
import { fallBackProductImage } from "@/constant/general.constant";

const ProductCard = (props: IProductCard) => {
  const router = useRouter();
  return (
    <Box
      className="w-[400px] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden bg-gradient-to-b from-white to-gray-100"
      sx={{
        "&:hover": {
          transform: "translateY(-5px)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <Image
        onClick={() => {
          router.push(`/product-detail/${props._id}`);
        }}
        className="cursor-pointer hover:opacity-90 transition-opacity duration-300 ease-in-out"
        src={props.image || fallBackProductImage}
        height={400}
        width={400}
        alt={props.name}
        style={{
          width: "400px",
          height: "250px",
          objectFit: "cover",
        }}
      />

      <Stack className="p-6 space-y-4">
        <Box className="flex justify-between items-center">
          <Typography variant="h6" className="font-bold text-gray-800">
            {props.name}
          </Typography>
          <Chip label={props.brand} color="warning" className="font-bold" />
        </Box>
        <Typography variant="h6" className=" text-gray-700">
          Price:
          <span className="ml-2 text-green-500 hover:text-green-700">
            ${props.price}
          </span>
        </Typography>
        <Typography className="text-lg text-gray-600 text-justify">
          {props.shortDescription}...
        </Typography>
        <Button
          onClick={() => {
            router.push(`/product-detail/${props._id}`);
          }}
          variant="contained"
          color="warning"
          className="w-full py-2 font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
        >
          Explore
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
