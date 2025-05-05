import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FlushCartButton from "./FlushCartButton";
import { ICartItem } from "./CartItemSection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import { AxiosResponse } from "axios";
import { fallBackProductImage } from "@/constant/general.constant";

interface IProps {
  cartItemList?: ICartItem[];
}

interface ICartItemDeleteRes extends AxiosResponse {
  data: {
    message: string;
  };
}
const CartItemTable = (props: IProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async (cartId: string) => {
      return await axiosInstance.delete(`/cart/item/delete/${cartId}`);
    },
    onSuccess: (res: ICartItemDeleteRes) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["get-cart-list"] });
      queryClient.invalidateQueries({ queryKey: ["get-cart-item-count"] });
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });
  return (
    <Box className="flex flex-col w-2/3">
      <TableContainer component={Paper}>
        <Box className="w-full flex justify-end items-center">
          <FlushCartButton />
        </Box>
        {isPending && <LinearProgress color="warning" />}

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="font-semibold text-lg">
                S.N.
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Image
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Name
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Price per unit
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Quantity
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Sub total
              </TableCell>
              <TableCell align="center" className="font-semibold text-lg">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.cartItemList &&
              props.cartItemList.length > 0 &&
              props.cartItemList.map((item, index) => {
                return (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" className="text-base">
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="flex justify-center items-center"
                    >
                      <Image
                        src={item.product.image || fallBackProductImage}
                        alt="food"
                        width={250}
                        height={250}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" className="text-base">
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Chip label={item.product.brand} color="secondary" />
                    </TableCell>
                    <TableCell align="center" className="text-base">
                      ${item.product.price}
                    </TableCell>
                    <TableCell align="center" className="text-base">
                      {item.orderedQuantity}
                    </TableCell>
                    <TableCell align="center" className="text-base">
                      $1500
                    </TableCell>
                    <TableCell align="center" className="text-base">
                      <Tooltip title="Remove">
                        <IconButton
                          color="error"
                          onClick={() => {
                            mutate(item._id);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartItemTable;
