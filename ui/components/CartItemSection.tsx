"use client";
import React from "react";
import CartItemTable from "./CartItemTable";
import CartAmount from "./CartAmount";
import FlushCartButton from "./FlushCartButton";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { CircularProgress } from "@mui/material";
import { IError } from "@/interface/error.interface";
import NoCartItem from "./NoCartItem";

export interface ICartItem {
  _id: string;
  orderedQuantity: number;
  product: {
    name: string;
    price: number;
    quantity: number;
    category: string;
    brand: string;
    image?: string;
  };
}

const CartItemSection = () => {
  const { isPending, data, isError, error } = useQuery<ICartItem[], IError>({
    queryKey: ["get-cart-list"],
    queryFn: async () => {
      const response = await axiosInstance.post("/cart/list");

      return response.data.cartItems;
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (data?.length === 0) {
    return <NoCartItem />;
  }
  return (
    <>
      <CartItemTable cartItemList={data} />
      <CartAmount />
    </>
  );
};

export default CartItemSection;
