"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  useTheme,
} from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4, // spacing between columns
            justifyContent: "space-between",
          }}
        >
          {/* Column 1 */}
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
            <Typography
              variant="h6"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              TechMarket
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your premier destination for the latest in technology. Quality
              products, competitive prices.
            </Typography>
          </Box>

          {/* Column 2 */}
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Shop
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Smartphones", "Laptops", "Tablets", "Accessories"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    color="text.secondary"
                    underline="hover"
                    variant="body2"
                  >
                    {item}
                  </Link>
                )
              )}
            </Box>
          </Box>

          {/* Column 3 */}
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Customer Service
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Contact Us", "Shipping Info", "Returns", "Support"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    color="text.secondary"
                    underline="hover"
                    variant="body2"
                  >
                    {item}
                  </Link>
                )
              )}
            </Box>
          </Box>

          {/* Column 4 */}
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                "About Us",
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="text.secondary"
                  underline="hover"
                  variant="body2"
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 TechMarket. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with Next.js and Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
