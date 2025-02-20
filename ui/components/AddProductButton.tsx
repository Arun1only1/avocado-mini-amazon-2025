"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const AddProductButton: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        className="mt-8"
        onClick={() => {
          router.push("/add-product");
        }}
      >
        Add Product
      </Button>
    </>
  );
};

export default AddProductButton;
