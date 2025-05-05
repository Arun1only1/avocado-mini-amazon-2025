import { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import { Button, CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface IFlushCartResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

const FlushCartButton = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation<IFlushCartResponse, IError>({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await axiosInstance.delete("/cart/flush");
    },
    onSuccess: (res) => {
      toast.success(res.data.message);

      queryClient.invalidateQueries({ queryKey: ["get-cart-list"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        mutate();
      }}
    >
      clear cart
    </Button>
  );
};

export default FlushCartButton;
