"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const NoCartItem = () => {
  const router = useRouter();
  return (
    <Box className="shadow-2xl p-8 gap-8 w-1/3 flex flex-col justify-between items-center">
      <Typography variant="h6">No item is added to cart.</Typography>
      <Button
        variant="contained"
        onClick={() => {
          router.push("/");
        }}
      >
        Keep shopping
      </Button>
    </Box>
  );
};

export default NoCartItem;
