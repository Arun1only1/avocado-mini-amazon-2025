"use client";
import axiosInstance from "@/lib/axios.instance";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { IData } from "./BuyerCardContainer";
import { IError } from "@/interface/error.interface";

export interface IProductCard {
  _id: string;
  image?: string;
  name: string;
  brand: string;
  price: number;
  shortDescription: string;
}
const SellerCardContainer = (props: { userRole: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, isError, error } = useQuery<IData, IError>({
    queryKey: ["get-seller-list", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.post("/product/seller/list", {
        page: currentPage,
        limit: 9,
      });

      return {
        productList: response?.data?.productList,
        totalPage: response?.data?.totalPage,
      };
    },
    enabled: props.userRole === "seller",
  });

  if (isPending) {
    return <CircularProgress color="warning" />;
  }

  if (isError) {
    toast.error(error?.response?.data?.message);
    return;
  }

  return (
    <Box className="flex flex-col gap-4 justify-center items-center">
      <Box className="flex flex-wrap gap-12 justify-center items-center p-8 m-8">
        {data &&
          data.productList &&
          data.productList.map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })}
      </Box>

      {data.totalPage > 0 && (
        <Pagination
          page={currentPage}
          count={data.totalPage}
          color="secondary"
          onChange={(_, value: number) => {
            setCurrentPage(value);
          }}
        />
      )}
    </Box>
  );
};

export default SellerCardContainer;
