"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { featuredProducts } from "@/shared/_mock/_featuredProduct";
import ProductCard from "../../product/ProductCard";

const FeaturedProducts: React.FC = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "text.primary",
          }}
        >
          Featured Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3, // spacing between cards
            justifyContent: "center",
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
