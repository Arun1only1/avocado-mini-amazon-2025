import axiosInstance from "@/lib/axios.instance";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { IProductCard } from "./SellerCardContainer";
import { IError } from "@/interface/error.interface";

export interface IData {
  productList: IProductCard[];
  totalPage: number;
}
const BuyerCardContainer = (props: { userRole: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, isError, error } = useQuery<IData, IError>({
    queryKey: ["buyer-product-list", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.post("/product/buyer/list", {
        page: currentPage,
        limit: 9,
      });

      return {
        productList: response?.data?.productList,
        totalPage: response?.data?.totalPage,
      };
    },
    enabled: props.userRole === "buyer",
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box className="flex flex-col gap-8 justify-center items-center m-12 p-8">
      <Box className="flex  gap-12 flex-wrap justify-center items-center">
        {data?.productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={data?.totalPage}
        color="secondary"
        onChange={(_, value: number) => {
          setCurrentPage(value);
        }}
      />
    </Box>
  );
};

export default BuyerCardContainer;
