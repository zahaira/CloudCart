"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { featuredProducts } from "@/shared/_mock/_featuredProduct";

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
            <Box
              key={product.id}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" }, // responsive widths
                display: "flex",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 700, mb: 2 }}
                  >
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: "auto",
                      borderRadius: 2,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
