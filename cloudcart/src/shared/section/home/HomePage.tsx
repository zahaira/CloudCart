"use client";

import React from "react";
import { Box } from "@mui/material";
import Hero from "./component/hero";
import FeaturedProducts from "./component/FeaturedProducts";

const HomePage = () => {
  const handleShopNowClick = () => {
    console.log("Shop Now clicked!");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Hero onShopNowClick={handleShopNowClick} />
      <FeaturedProducts />
    </Box>
  );
};

export default HomePage;
