"use client";
import { IDeleteProductResponse } from "@/interface/delete.product.response.interface";
import { IError } from "@/interface/error.interface";
import axiosInstance from "@/lib/axios.instance";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";
import toast from "react-hot-toast";

interface Props {
  productId: string;
}

const DeleteProductDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isPending, mutate } = useMutation<IDeleteProductResponse, IError>({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await axiosInstance.delete(`/product/delete/${props.productId}`);
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <>
      <Button
        onClick={handleClickOpen}
        fullWidth
        variant="contained"
        color="error"
        startIcon={<DeleteOutlineIcon />}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isPending && <LinearProgress color="error" />}
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Product once deleted cannot be restored. This process is{" "}
            <span className="font-semibold">irreversible</span>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">
            No
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            variant="contained"
            color="error"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProductDialog;
