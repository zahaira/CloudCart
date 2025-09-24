import { Product } from "@/shared/types/product";
import { fCurrency } from "@/utils/format-number";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const theme = useTheme();
  return (
    <Box
      key={product.id}
      sx={{
        flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
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
          image={product.images?.[0]}
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
            sx={{
              fontWeight: 600,
              mb: 1,
              ":hover": {
                color: theme.palette.primary.light,
              },
            }}
          >
            <Link
              href={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {product.name}
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              typography: "h6",
            }}
          >
            {/* Original price, muted and line-through */}
            {product.price && product.priceSale && (
              <Box
                component="span"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                  fontSize: "0.9rem",
                }}
              >
                {fCurrency(product.price)}
              </Box>
            )}

            {/* Current selling price */}
            <Box
              component="span"
              sx={{
                color: product.priceSale ? "error.main" : "text.primary",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              {fCurrency(product.priceSale ?? product.price)}
            </Box>
          </Box>

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
  );
};

export default ProductCard;
