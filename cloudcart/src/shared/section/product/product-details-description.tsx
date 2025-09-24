import { Product } from "@/shared/types/product";
import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

interface props {
  description: Product["description"];
  specifications: Product["specifications"];
}
const ProductDetailsDescription = ({ specifications, description }: props) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      {/* Description */}
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        Description
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          fontWeight: 400,
          color: "text.primary",
          lineHeight: 1.6,
        }}
      >
        {description || "No description available."}
      </Typography>

      {/* Specifications */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        Specifications
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
        }}
      >
        <Table size="small">
          <TableBody>
            {Object.entries(specifications ?? {}).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell
                  sx={{
                    fontWeight: 300,
                    whiteSpace: "nowrap",
                    width: "40%",
                    padding: "12px 16px",
                  }}
                >
                  {key}
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    padding: "12px 16px",
                  }}
                >
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductDetailsDescription;
