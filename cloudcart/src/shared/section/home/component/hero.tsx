"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface HeroProps {
  onShopNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNowClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: { xs: 6, md: 10 },
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Latest Tech at
              <br />
              Unbeatable Prices
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: "1rem", sm: "1.125rem" },
                lineHeight: 1.6,
              }}
            >
              Discover cutting-edge smartphones, powerful laptops, and premium
              accessories. Quality technology for every budget.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={onShopNowClick}
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "grey.100",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Shop Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>

          {/* Right Column */}
          <Box
            component="img"
            src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
            alt="Latest Technology"
            sx={{
              flex: 1,
              width: "100%",
              height: { xs: 200, sm: 300, md: 400 },
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: 6,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
