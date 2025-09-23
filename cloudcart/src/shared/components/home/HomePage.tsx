"use client";

import React from "react";
import { Box } from "@mui/material";
import Hero from "./hero";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  const handleShopNowClick = () => {
    console.log("Shop Now clicked!");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, pt: { xs: 7, sm: 8 } }}>
      <Hero onShopNowClick={handleShopNowClick} />
      <FeaturedProducts />
    </Box>
  );
};

export default HomePage;
