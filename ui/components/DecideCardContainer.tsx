"use client";
import { useEffect, useState } from "react";
import BuyerCardContainer from "./BuyerCardContainer";
import SellerCardContainer from "./SellerCardContainer";
import { Box } from "@mui/material";
import AddProductButton from "./AddProductButton";

const DecideCardContainer = () => {
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const role = window.localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    } else {
      setError("Unauthorized.");
    }
  }, []);

  if (userRole === "seller") {
    return (
      <Box className="flex flex-col justify-center items-center">
        <AddProductButton />
        <SellerCardContainer userRole={userRole} />
      </Box>
    );
  } else if (userRole === "buyer") {
    return <BuyerCardContainer userRole={userRole} />;
  }
};

export default DecideCardContainer;
