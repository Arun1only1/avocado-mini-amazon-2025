"use client";

import { Fab, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const AddProductButton: FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/add-product");
  };

  return (
    <Tooltip title="Add Product" placement="left">
      <Fab
        color="secondary"
        aria-label="add product"
        onClick={handleClick}
        className="fixed right-12 bottom-12 bg-red-500 hover:bg-red-600 p-8"
      >
        <AddTwoToneIcon className="text-3xl" />
      </Fab>
    </Tooltip>
  );
};

export default AddProductButton;
