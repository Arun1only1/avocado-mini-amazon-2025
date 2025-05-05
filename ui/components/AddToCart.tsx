import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import { AxiosResponse } from "axios";

interface Props {
  totalQuantity: number;
  productId: string;
}

interface IAddToCartResponse extends AxiosResponse {
  data: {
    message: string;
  };
}
const AddToCart: React.FC<Props> = ({ totalQuantity, productId }) => {
  const [count, setCount] = useState(1);

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation<IAddToCartResponse, IError>({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      return await axiosInstance.post("/cart/item/add", {
        productId,
        orderedQuantity: count,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["get-cart-item-count"] });
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setCount(0);
      return;
    }
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const clampedValue = Math.max(1, Math.min(value, totalQuantity));
      setCount(clampedValue);
    }
  };

  const handleBlur = () => {
    if (count < 1 || isNaN(count)) {
      setCount(1);
    }
  };

  const handleIncrement = () => setCount(Math.min(count + 1, totalQuantity));
  const handleDecrement = () => setCount(Math.max(count - 1, 1));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, // Consistent spacing between elements
        width: "100%",
        maxWidth: 320, // Slightly wider for better balance
        margin: "auto",
        padding: 2, // Add padding for breathing room
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the controls for symmetry
          gap: 1, // Tighter spacing between buttons and input
          backgroundColor: "#fff", // White background for the control area
          borderRadius: 1, // Slightly rounded
          padding: 1, // Inner padding for cohesion
          border: "1px solid #e0e0e0", // Light border for definition
        }}
      >
        <IconButton
          aria-label="Decrease quantity"
          disabled={count === 1}
          onClick={handleDecrement}
          color="success"
          sx={{
            "&:hover": { backgroundColor: "#e8f5e9" }, // Subtle hover effect
            "&.Mui-disabled": { color: "#bdbdbd" }, // Better disabled state
          }}
        >
          <RemoveSharpIcon />
        </IconButton>
        <TextField
          label="Quantity"
          value={count}
          onChange={handleCountChange}
          onBlur={handleBlur}
          inputProps={{
            min: 1,
            max: totalQuantity,
            step: 1,
          }}
          sx={{
            width: 80, // Slightly narrower for compactness
            "& .MuiInputBase-root": {
              height: 40, // Consistent height with buttons
              fontSize: "1.1rem", // Larger text for readability
            },
            "& .MuiInputBase-input": {
              textAlign: "center",
              padding: "0 8px", // Adjust padding for better fit
            },
            "& .MuiInputLabel-root": {
              transform: "translate(14px, -6px) scale(0.75)", // Position label above
              backgroundColor: "#fff", // Seamless label background
              padding: "0 4px", // Avoid overlap
            },
          }}
        />
        <IconButton
          aria-label="Increase quantity"
          disabled={count === totalQuantity}
          onClick={handleIncrement}
          color="success"
          sx={{
            "&:hover": { backgroundColor: "#e8f5e9" }, // Matching hover effect
            "&.Mui-disabled": { color: "#bdbdbd" }, // Consistent disabled state
          }}
        >
          <AddSharpIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        color="success"
        startIcon={<ShoppingCartOutlinedIcon />}
        fullWidth
        sx={{
          padding: "10px 0", // Taller button for better click area
          fontWeight: 600, // Bold text for emphasis
          textTransform: "none", // Avoid all-caps for a friendlier feel
          "&:hover": {
            backgroundColor: "#388e3c", // Darker green on hover
          },
        }}
        onClick={() => {
          mutate();
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default AddToCart;
