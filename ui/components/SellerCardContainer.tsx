"use client";
import axiosInstance from "@/lib/axios.instance";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

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

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["get-seller-list", currentPage],
    queryFn: async () => {
      return await axiosInstance.post("/product/seller/list", {
        page: currentPage,
        limit: 9,
      });
    },
    enabled: props.userRole === "seller",
  });

  const productList: IProductCard[] = data?.data?.productList;

  const totalPage: number = data?.data?.totalPage;

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
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>

      {totalPage > 0 && (
        <Pagination
          page={currentPage}
          count={totalPage}
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
